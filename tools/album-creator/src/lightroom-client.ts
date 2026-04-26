/**
 * Lightroom API client (lr.adobe.io) — adapted from Alt-text Electron app.
 */
import { getValidAdobeAccessToken } from './adobe-oauth.js'

const LR_BASE = 'https://lr.adobe.io'

/** Strip Adobe JSON abuse mitigation prefix. */
export function parseLightroomJson(text: string): unknown {
  const stripped = text.replace(/^\s*while\s*\(\s*1\s*\)\s*{\s*}\s*/, '')
  return JSON.parse(stripped)
}

function resolveHref(base: string | undefined, href: string): string {
  if (href.startsWith('http')) return href
  const b = (base ?? `${LR_BASE}/v2/`).replace(/\/?$/, '/')
  return new URL(href.replace(/^\//, ''), b).toString()
}

export interface LrAlbumSummary {
  id: string
  name: string
  created: string | null
  updated: string | null
}

export interface LrAssetSummary {
  id: string
  label: string
}

/** One image in an album (`?embed=asset` on album assets list). */
export interface LrAlbumAsset {
  id: string
  label: string
  /** Present when album assets were listed with `embed=asset`. */
  payload?: Record<string, unknown>
  /** From embedded asset; `video` rows are skipped on export. */
  subtype?: string
}

interface LrLinks {
  next?: { href: string }
  [key: string]: { href: string } | undefined
}

interface LrListResponse {
  base?: string
  resources?: unknown[]
  links?: LrLinks
}

function getResourceId(obj: Record<string, unknown>): string | null {
  if (typeof obj.id === 'string') return obj.id
  return null
}

function getAlbumName(obj: Record<string, unknown>): string {
  const payload = obj.payload as Record<string, unknown> | undefined
  const name = payload?.name
  return typeof name === 'string' && name.trim() ? name : 'Untitled album'
}

function getAlbumDates(obj: Record<string, unknown>): { created: string | null; updated: string | null } {
  const created = typeof obj.created === 'string' ? obj.created : null
  const updated = typeof obj.updated === 'string' ? obj.updated : null
  return { created, updated }
}

function parseAlbumUpdatedMs(summary: LrAlbumSummary): number {
  if (summary.updated) {
    const t = Date.parse(summary.updated)
    if (!Number.isNaN(t)) return t
  }
  if (summary.created) {
    const t = Date.parse(summary.created)
    if (!Number.isNaN(t)) return t
  }
  return 0
}

function getAssetLabel(obj: Record<string, unknown>): string {
  const nested = obj.asset as Record<string, unknown> | undefined
  const nestedPayload = nested?.payload as Record<string, unknown> | undefined
  if (nestedPayload) {
    const imp = nestedPayload.importSource as Record<string, unknown> | undefined
    if (typeof imp?.fileName === 'string' && imp.fileName.trim()) return imp.fileName.trim()
    if (typeof nestedPayload.name === 'string' && nestedPayload.name.trim()) return nestedPayload.name.trim()
  }
  const payload = obj.payload as Record<string, unknown> | undefined
  const fileName = payload?.fileName
  if (typeof fileName === 'string' && fileName.trim()) return fileName
  const id = getResourceId(obj)
  return id ?? 'Asset'
}

function parseAlbumAssetResource(o: Record<string, unknown>): LrAlbumAsset | null {
  const nested = o.asset as Record<string, unknown> | undefined
  if (nested && typeof nested.id === 'string') {
    const payload = nested.payload as Record<string, unknown> | undefined
    const subtype = typeof nested.subtype === 'string' ? nested.subtype : undefined
    return { id: nested.id, label: getAssetLabel(o), payload: payload ?? undefined, subtype }
  }
  const assetLink = o.links as Record<string, { href?: string }> | undefined
  const selfHref = assetLink?.['/rels/asset']?.href ?? assetLink?.self?.href
  let assetId: string | null = null
  if (selfHref && typeof selfHref === 'string') {
    const m = /\/assets\/([^/?#]+)/.exec(selfHref)
    if (m) assetId = m[1]
  }
  if (!assetId) assetId = getResourceId(o)
  if (!assetId) return null
  return { id: assetId, label: getAssetLabel(o) }
}

export class LightroomClient {
  constructor(
    private clientId: string,
    private getAccessToken: () => Promise<string>
  ) {}

  private async lrFetch(url: string, init: RequestInit = {}): Promise<Response> {
    const token = await this.getAccessToken()
    const headers = new Headers(init.headers)
    headers.set('X-API-Key', this.clientId)
    headers.set('Authorization', `Bearer ${token}`)
    return fetch(url, { ...init, headers })
  }

  async getAccount(): Promise<unknown> {
    const res = await this.lrFetch(`${LR_BASE}/v2/account`)
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`Lightroom account failed (${res.status}): ${text.slice(0, 300)}`)
    }
    return parseLightroomJson(text)
  }

  async getCatalog(): Promise<{ id: string; base: string; albumsHref: string }> {
    const res = await this.lrFetch(`${LR_BASE}/v2/catalog`)
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`Lightroom catalog failed (${res.status}): ${text.slice(0, 300)}`)
    }
    const data = parseLightroomJson(text) as Record<string, unknown>

    const id = data.id
    if (typeof id !== 'string') throw new Error('Invalid catalog response: missing id')
    const base = typeof data.base === 'string' ? data.base : `${LR_BASE}/v2/`
    const collections = data.links as Record<string, { href?: string }> | undefined
    let href = collections?.['/rels/subtyped_albums']?.href
    if (typeof href !== 'string') {
      throw new Error('Invalid catalog response: missing /rels/subtyped_albums link')
    }
    href = href.replace(/\?subtype=[^&]+/, '')
    const albumsHref = resolveHref(base, href)
    return { id, base, albumsHref }
  }

  async fetchListPage(url: string): Promise<LrListResponse> {
    const res = await this.lrFetch(url)
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`Lightroom list failed (${res.status}): ${text.slice(0, 300)}`)
    }
    return parseLightroomJson(text) as LrListResponse
  }

  async listAllAlbums(catalogBase: string, firstPageUrl: string): Promise<LrAlbumSummary[]> {
    const albums: LrAlbumSummary[] = []
    let nextUrl: string | null = firstPageUrl
    while (nextUrl) {
      const page = await this.fetchListPage(nextUrl)
      const resources = page.resources ?? []
      for (const r of resources) {
        if (r && typeof r === 'object') {
          const o = r as Record<string, unknown>
          const id = getResourceId(o)
          if (id) {
            const { created, updated } = getAlbumDates(o)
            albums.push({ id, name: getAlbumName(o), created, updated })
          }
        }
      }
      const nextHref = page.links?.next?.href
      nextUrl = nextHref ? resolveHref(page.base ?? catalogBase, nextHref) : null
    }
    albums.sort((a, b) => parseAlbumUpdatedMs(b) - parseAlbumUpdatedMs(a))
    return albums
  }

  /**
   * Lists assets in an album. Uses `embed=asset` so each row includes `asset.payload` when available.
   */
  async listAlbumAssets(
    catalogBase: string,
    catalogId: string,
    albumId: string
  ): Promise<LrAlbumAsset[]> {
    const firstUrl = `${LR_BASE}/v2/catalogs/${catalogId}/albums/${albumId}/assets?embed=asset`
    const assets: LrAlbumAsset[] = []
    let nextUrl: string | null = firstUrl
    while (nextUrl) {
      const page = await this.fetchListPage(nextUrl)
      const resources = page.resources ?? []
      for (const r of resources) {
        if (r && typeof r === 'object') {
          const o = r as Record<string, unknown>
          const row = parseAlbumAssetResource(o)
          if (row) assets.push(row)
        }
      }
      const nextHref = page.links?.next?.href
      nextUrl = nextHref ? resolveHref(page.base ?? catalogBase, nextHref) : null
    }
    return assets
  }

  /**
   * Download the best available built-in rendition (long-edge JPEG). Tries 2048 → 1280 → 640.
   */
  async tryGetRenditionBuffer(
    catalogId: string,
    assetId: string,
    order: string[] = ['2048', '1280', '640']
  ): Promise<{ buffer: Buffer; rendition: string }> {
    const errors: string[] = []
    for (const rendition of order) {
      try {
        const buffer = await this.getRenditionBuffer(catalogId, assetId, rendition)
        return { buffer, rendition }
      } catch (e) {
        errors.push(`${rendition}: ${e instanceof Error ? e.message : String(e)}`)
      }
    }
    throw new Error(`No rendition available for asset ${assetId}: ${errors.join(' | ')}`)
  }

  async getRenditionBuffer(catalogId: string, assetId: string, rendition: string): Promise<Buffer> {
    const url = `${LR_BASE}/v2/catalogs/${catalogId}/assets/${assetId}/renditions/${rendition}`
    const res = await this.lrFetch(url)
    if (!res.ok) {
      const t = await res.text()
      throw new Error(`Rendition ${rendition} failed (${res.status}): ${t.slice(0, 200)}`)
    }
    const ab = await res.arrayBuffer()
    return Buffer.from(ab)
  }

  async getAssetExternalXmpDevelop(catalogId: string, assetId: string): Promise<string> {
    const url = `${LR_BASE}/v2/catalogs/${catalogId}/assets/${assetId}/xmp/xmp`
    const res = await this.lrFetch(url, {
      headers: {
        Accept: 'application/rdf+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
    })
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`XMP develop GET failed (${res.status}): ${text.slice(0, 400)}`)
    }
    return text
  }

  async getAsset(catalogId: string, assetId: string): Promise<string> {
    const url = `${LR_BASE}/v2/catalogs/${catalogId}/assets/${assetId}`
    const res = await this.lrFetch(url, {
      headers: {
        Accept: 'application/json, */*;q=0.8',
      },
    })
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`Asset GET failed (${res.status}): ${text.slice(0, 400)}`)
    }
    return text
  }
}

export function createLightroomClient(clientId: string): LightroomClient {
  return new LightroomClient(clientId, () => getValidAdobeAccessToken(clientId))
}
