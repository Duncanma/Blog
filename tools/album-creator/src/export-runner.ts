import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { generateCaptionFromImageBuffer } from '@duncanma/alt-text-headless'
import {
  createLightroomClient,
  parseLightroomJson,
  type LightroomClient,
  type LrAlbumAsset,
} from './lightroom-client.js'
import {
  buildPictureMetadata,
  captureDateFromPayload,
  emptyExifStrings,
  exifFromPayloadXmp,
  exifFromJpegBuffer,
  extractKeywordsFromPayload,
  mergeExif,
  parseCaptureDateMs,
} from './asset-metadata.js'
import { uploadJpegToAzure } from './azure-upload.js'
import { TARGET_WIDTHS, writeResizedJpegSet } from './export-images.js'
import { findBlogRoot } from './find-blog-root.js'
import { resolveAlbumForExport, type ResolveAlbumOptions } from './resolve-album.js'
import { makeGalleryMakerSourceId, stableAssetUniqueId } from './lr-identity.js'
import { buildAlbumFrontmatter, type AlbumPicture, writeAlbumMarkdownFile } from './write-album-markdown.js'

export type ExportRunnerOptions = {
  clientId: string
  album: ResolveAlbumOptions
  slug: string
  blogRoot?: string
  outputMd?: string
  imagesDir?: string
  /** Full BaseURL for CDN image paths, e.g. https://photos.example.net/images/mytrip */
  baseUrl?: string
  /** Album page title (default: Lightroom album name). */
  title?: string
  description?: string
  featured?: number
  outputs?: string[]
  /** If false, do not prepend the "Photography" tag. Default true. */
  includePhotographyTag?: boolean
  /** List assets and call Adobe metadata APIs only; no JPEGs or markdown written. */
  dryRun?: boolean
  /** If true, generate captions for empty-caption images using configured AI provider. */
  generateCaptions?: boolean
  /** Optional AI provider/model overrides. */
  captionProvider?: string
  captionModel?: string
}

const DEFAULT_EXCLUDED_IMPORT_TAGS = ['Digital Competition', 'Print']

function normalizeKeyword(s: string): string {
  return s.trim()
}

function filterImportTags(tags: string[]): string[] {
  const excluded = new Set(DEFAULT_EXCLUDED_IMPORT_TAGS.map((t) => t.toLowerCase()))
  return tags.map(normalizeKeyword).filter((t) => t !== '' && !excluded.has(t.toLowerCase()))
}

function normalizeBaseUrlFromEnv(slug: string): string {
  const explicit = process.env.ALBUM_BASE_URL?.trim()
  if (explicit) return explicit.replace(/\/$/, '')
  const base = process.env.PHOTOS_BASE_URL?.trim().replace(/\/$/, '')
  if (!base) {
    throw new Error(
      'Set PHOTOS_BASE_URL in .env (parent folder for images, e.g. https://photos.duncanmackenzie.net/images) ' +
        'or set ALBUM_BASE_URL to the full album folder URL, or pass --base-url.'
    )
  }
  const s = slug.replace(/^\/+/, '')
  return `${base}/${s}`
}

function mergeTags(all: string[], includePhotography: boolean): string[] {
  const sortedUnique = Array.from(new Set(all.map((t) => t.trim()).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, 'en')
  )
  const seen = new Set<string>()
  const out: string[] = []
  const add = (t: string) => {
    const s = t.trim()
    if (!s) return
    const k = s.toLowerCase()
    if (seen.has(k)) return
    seen.add(k)
    out.push(s)
  }
  if (includePhotography) add('Photography')
  for (const t of sortedUnique) add(t)
  return out
}

type ExistingPictureOverride = {
  Title?: string
  Caption?: string
}

type ExistingAlbumOverrides = {
  title?: string
  tags?: string[]
  byUniqueId: Map<string, ExistingPictureOverride>
}

async function loadExistingAlbumOverrides(markdownPath: string): Promise<ExistingAlbumOverrides> {
  const empty: ExistingAlbumOverrides = { byUniqueId: new Map() }
  try {
    const text = await fs.readFile(markdownPath, 'utf-8')
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start < 0 || end <= start) return empty
    const root = JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>
    const title = typeof root.Title === 'string' && root.Title.trim() ? root.Title.trim() : undefined
    const tags = Array.isArray(root.Tags)
      ? root.Tags.map((t) => (typeof t === 'string' ? t.trim() : '')).filter(Boolean)
      : undefined
    const byUniqueId = new Map<string, ExistingPictureOverride>()
    const pictures = Array.isArray(root.Pictures) ? root.Pictures : []
    for (const p of pictures) {
      if (!p || typeof p !== 'object') continue
      const rec = p as Record<string, unknown>
      const id = typeof rec.uniqueID === 'string' ? rec.uniqueID : ''
      if (!id) continue
      const picTitle = typeof rec.Title === 'string' ? rec.Title : undefined
      const caption = typeof rec.Caption === 'string' ? rec.Caption : undefined
      byUniqueId.set(id, { Title: picTitle, Caption: caption })
    }
    return { title, tags, byUniqueId }
  } catch {
    return empty
  }
}

function hashKeyFromEnv(): string {
  return (process.env.HASH_KEY?.trim() || 'hashbrown')
}

function fileStemFromLabel(label: string): string {
  return path.parse(label).name || label
}

async function mergedAssetPayload(
  lr: LightroomClient,
  catalogId: string,
  row: LrAlbumAsset
): Promise<Record<string, unknown> | undefined> {
  const fromList = row.payload
  try {
    const text = await lr.getAsset(catalogId, row.id)
    const root = parseLightroomJson(text) as Record<string, unknown>
    const full = root.payload as Record<string, unknown> | undefined
    if (full && typeof full === 'object') {
      return { ...(fromList ?? {}), ...full }
    }
  } catch {
    // keep list payload only
  }
  return fromList
}

function truncate(s: string, max: number): string {
  const t = s.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, max - 1) + '…'
}

async function runDryRun(
  lr: LightroomClient,
  opts: ExportRunnerOptions,
  slug: string,
  resolved: { id: string; name: string },
  catalogId: string,
  rows: LrAlbumAsset[],
  outputMd: string,
  imagesDir: string,
  baseUrl: string,
  indexPad: number
): Promise<void> {
  const includePhoto = opts.includePhotographyTag !== false
  const allKeywords: string[] = []
  const exif = emptyExifStrings()
  const hashKey = hashKeyFromEnv()

  console.error('=== DRY RUN (no files written; renditions not downloaded) ===')
  console.error(`Album: "${resolved.name}"  id=${resolved.id}`)
  console.error(`Would write markdown: ${outputMd}`)
  console.error(`Would write ${rows.length * TARGET_WIDTHS.length} JPEGs under: ${imagesDir}`)
  console.error(`BaseURL: ${baseUrl}`)
  console.error('')
  console.error('idx  uniqueID (prefix)    assetId (prefix)   kw  Title')
  console.error('---  ----------------    ------------------   --  -----')

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const n = i + 1
    const payload = await mergedAssetPayload(lr, catalogId, row)
    const rowKeywords = filterImportTags(extractKeywordsFromPayload(payload))
    allKeywords.push(...rowKeywords)
    const meta = buildPictureMetadata(row, exif, payload ?? undefined)
    const sourceId = makeGalleryMakerSourceId(meta.DateTimeOriginal, fileStemFromLabel(row.label))
    const uniqueID = stableAssetUniqueId(sourceId, hashKey)
    const kw = rowKeywords.length
    const idx = String(n).padStart(indexPad, '0')
    console.error(
      `${String(n).padStart(3)}  ${uniqueID.slice(0, 12)}…  ${row.id.slice(0, 8)}…          ${String(kw).padStart(2)}  ${truncate(meta.Title, 56)}`
    )
    if (n === 1) {
      console.error(`     example URLs: ${TARGET_WIDTHS.map((w) => `${baseUrl}/${slug}-${idx}-${w}.jpg`).join(' | ')}`)
    }
  }

  const tags = mergeTags(allKeywords, includePhoto)
  console.error('')
  console.error(`Tags (${tags.length}): ${truncate(tags.join(', '), 120)}`)
  console.error('')
  console.error('Dry run complete. Run without --dry-run to download renditions, write JPEGs, and write the album markdown.')
}

export async function runExport(opts: ExportRunnerOptions): Promise<void> {
  const slug = opts.slug.trim()
  if (!slug) throw new Error('--slug is required.')

  const blogRoot = opts.blogRoot?.trim() || findBlogRoot() || process.cwd()
  const outputMd =
    opts.outputMd?.trim() || path.join(blogRoot, 'content', 'albums', `${slug}.md`)
  const imagesDir = opts.imagesDir?.trim() || path.join(process.cwd(), 'album-export', slug)
  const baseUrl = (opts.baseUrl?.trim() || normalizeBaseUrlFromEnv(slug)).replace(/\/$/, '')
  const hashKey = hashKeyFromEnv()
  const existing = await loadExistingAlbumOverrides(outputMd)

  const lr = createLightroomClient(opts.clientId)
  const { id: catalogId, base, albumsHref } = await lr.getCatalog()
  const resolved = await resolveAlbumForExport(lr, base, albumsHref, opts.album)

  let rows = await lr.listAlbumAssets(base, catalogId, resolved.id)
  if (rows.length === 0) {
    throw new Error('Album is empty: no assets to export.')
  }

  rows = rows.filter((r) => !r.subtype || r.subtype === 'image')
  if (rows.length === 0) {
    throw new Error('Album has no image assets to export (only non-image types).')
  }

  rows = [...rows].sort(
    (a, b) => parseCaptureDateMs(a.payload) - parseCaptureDateMs(b.payload) || a.id.localeCompare(b.id)
  )

  const indexPad = Math.max(2, String(rows.length).length)

  if (opts.dryRun === true) {
    await runDryRun(lr, opts, slug, resolved, catalogId, rows, outputMd, imagesDir, baseUrl, indexPad)
    return
  }

  console.error(`Exporting album "${resolved.name}" (${resolved.id}) → ${outputMd}`)
  console.error(`Images → ${imagesDir}`)
  console.error('Uploads → Azure Blob container "photos"')

  const includePhoto = opts.includePhotographyTag !== false
  const allKeywords: string[] = []
  const doCaptionGen = opts.generateCaptions === true
  let captionGenerated = 0
  let captionSkipped = 0
  let captionFailed = 0

  const pictures: AlbumPicture[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const n = i + 1
    console.error(`  [${n}/${rows.length}] ${row.label} (${row.id.slice(0, 8)}…)`)

    const payload = await mergedAssetPayload(lr, catalogId, row)
    allKeywords.push(...filterImportTags(extractKeywordsFromPayload(payload)))

    const { buffer } = await lr.tryGetRenditionBuffer(catalogId, row.id)
    const exif = mergeExif(await exifFromJpegBuffer(buffer), exifFromPayloadXmp(payload))
    const meta = buildPictureMetadata(row, exif, payload ?? undefined)

    const variants = await writeResizedJpegSet(buffer, imagesDir, slug, n, indexPad)
    for (const v of variants) {
      await uploadJpegToAzure(baseUrl, v.fileName, v.localPath)
    }

    const links = TARGET_WIDTHS.map((tier, ti) => {
      const v = variants[ti]
      return {
        Url: `${baseUrl}/${v.fileName}`,
        Width: v.width,
        Height: v.height,
      }
    })

    const sourceId = makeGalleryMakerSourceId(meta.DateTimeOriginal, fileStemFromLabel(row.label))
    const uniqueID = stableAssetUniqueId(sourceId, hashKey)
    const dt = meta.DateTimeOriginal || exif.DateTimeOriginal || captureDateFromPayload(payload)
    const existingPicture = existing.byUniqueId.get(uniqueID)
    let finalCaption = existingPicture?.Caption ?? meta.Caption
    if (doCaptionGen && !finalCaption.trim()) {
      try {
        finalCaption = (
          await generateCaptionFromImageBuffer(buffer, {
            provider: opts.captionProvider,
            model: opts.captionModel,
          })
        ).trim()
        if (finalCaption) {
          console.error(`    caption generated via AI for ${row.label}`)
          captionGenerated++
        } else {
          captionSkipped++
        }
      } catch (e) {
        console.error(
          `    caption generation failed for ${row.label}: ${e instanceof Error ? e.message : String(e)}`
        )
        captionFailed++
      }
    } else if (doCaptionGen) {
      captionSkipped++
    }

    pictures.push({
      Title: existingPicture?.Title ?? meta.Title,
      uniqueID,
      Caption: finalCaption,
      Latitude: exif.Latitude,
      Longitude: exif.Longitude,
      Camera: exif.Camera,
      Lens: exif.Lens,
      FocalLength: exif.FocalLength,
      fStop: exif.fStop,
      DateTimeOriginal: dt,
      Links: links,
      catalogId,
      assetId: row.id,
    })
  }

  const tags = mergeTags(allKeywords, includePhoto)
  const doc = buildAlbumFrontmatter({
    outputs: opts.outputs?.length ? opts.outputs : ['html'],
    tags: existing.tags?.length ? existing.tags : tags,
    title: opts.title?.trim() || existing.title || resolved.name,
    description: opts.description?.trim() ?? '',
    baseUrl,
    featured: opts.featured ?? 0,
    pictures,
  })

  await writeAlbumMarkdownFile(outputMd, doc)
  if (doCaptionGen) {
    console.error(
      `Caption summary: generated=${captionGenerated}, skipped=${captionSkipped}, failed=${captionFailed}`
    )
  }
  console.error('Done.')
}
