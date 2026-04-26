import exifr from 'exifr'
import type { LrAlbumAsset } from './lightroom-client.js'

function str(v: unknown): string {
  if (v == null) return ''
  if (typeof v === 'string') return v.trim()
  if (v instanceof Date) return v.toISOString()
  return String(v).trim()
}

function obj(v: unknown): Record<string, unknown> | undefined {
  if (v && typeof v === 'object' && !Array.isArray(v)) return v as Record<string, unknown>
  return undefined
}

function collectKeywords(v: unknown, out: string[]): void {
  if (v == null) return
  if (typeof v === 'string') {
    const t = v.trim()
    if (t) out.push(t)
    return
  }
  if (Array.isArray(v)) {
    for (const x of v) collectKeywords(x, out)
    return
  }
  if (typeof v === 'object') {
    const rec = v as Record<string, unknown>
    // Lightroom XMP often encodes subject as { "Keyword": true }.
    for (const [k, x] of Object.entries(rec)) {
      if (typeof x === 'boolean') {
        if (x && k.trim()) out.push(k.trim())
        continue
      }
      collectKeywords(x, out)
    }
  }
}

export function extractKeywordsFromPayload(payload: Record<string, unknown> | undefined): string[] {
  if (!payload) return []
  const out: string[] = []
  collectKeywords(payload.keywords, out)
  collectKeywords(payload.keyword, out)
  collectKeywords(payload.tags, out)
  const xmp = obj(payload.xmp)
  const dc = obj(xmp?.dc)
  // Lightroom commonly stores keywords in XMP dc:subject.
  collectKeywords(dc?.subject, out)
  const lr = obj(xmp?.lr)
  // Hierarchical keywords can appear in lr:hierarchicalSubject.
  collectKeywords(lr?.hierarchicalSubject, out)
  return out
}

export function titleFromPayload(payload: Record<string, unknown> | undefined, fallbackLabel: string): string {
  if (!payload) return fallbackLabel
  const xmp = obj(payload.xmp)
  const dc = obj(xmp?.dc)
  const t = str(payload.title) || str(payload.name) || str(dc?.title)
  return t || fallbackLabel
}

export function captionFromPayload(payload: Record<string, unknown> | undefined): string {
  if (!payload) return ''
  const xmp = obj(payload.xmp)
  const dc = obj(xmp?.dc)
  const iptcCore = obj(xmp?.iptcCore)
  return (
    str(payload.caption) ||
    str(payload.description) ||
    str(payload.altText) ||
    str(iptcCore?.AltTextAccessibility) ||
    str(dc?.description)
  )
}

export function captureDateFromPayload(payload: Record<string, unknown> | undefined): string {
  if (!payload) return ''
  const d = str(payload.captureDate)
  if (!d || d.startsWith('0000-00-00')) return ''
  return d
}

export function parseCaptureDateMs(payload: Record<string, unknown> | undefined): number {
  const d = captureDateFromPayload(payload)
  if (!d) return Number.MAX_SAFE_INTEGER
  const t = Date.parse(d)
  return Number.isNaN(t) ? Number.MAX_SAFE_INTEGER : t
}

export type ExifStrings = {
  Camera: string
  Lens: string
  FocalLength: string
  fStop: string
  DateTimeOriginal: string
  Latitude: string
  Longitude: string
}

function flattenFractionLike(v: unknown): string {
  if (typeof v === 'number') return String(v)
  if (typeof v === 'string') return v.trim()
  if (Array.isArray(v) && v.length >= 2) {
    const n = Number(v[0])
    const d = Number(v[1])
    if (Number.isFinite(n) && Number.isFinite(d) && d !== 0) return String(n / d)
  }
  return ''
}

const emptyExif: ExifStrings = {
  Camera: '',
  Lens: '',
  FocalLength: '',
  fStop: '',
  DateTimeOriginal: '',
  Latitude: '',
  Longitude: '',
}

/** EXIF fields when no JPEG is loaded (e.g. export --dry-run). */
export function emptyExifStrings(): ExifStrings {
  return { ...emptyExif }
}

export async function exifFromJpegBuffer(buf: Buffer): Promise<ExifStrings> {
  try {
    const tags = await exifr.parse(buf, {
      iptc: true,
      exif: true,
      gps: true,
      reviveValues: false,
    })
    if (!tags || typeof tags !== 'object') return { ...emptyExif }
    const t = tags as Record<string, unknown>
    const make = str(t.Make)
    const model = str(t.Model)
    const camera = [make, model].filter(Boolean).join(' ').trim()
    const lens = str(t.LensModel) || str(t.LensMake) || str(t.Lens)
    const focal = t.FocalLength
    const focalStr =
      typeof focal === 'number'
        ? String(Math.round(focal))
        : typeof focal === 'string'
          ? focal.trim()
          : ''
    const fn = t.FNumber ?? t.ApertureValue
    let fStop = ''
    if (typeof fn === 'number') fStop = fn >= 1 ? String(fn) : String(Math.round(fn * 10) / 10)
    else if (typeof fn === 'string') fStop = fn.trim()
    const dt = str(t.DateTimeOriginal) || str(t.CreateDate) || str(t.ModifyDate) || str(t.DateTime)
    let lat = ''
    let lon = ''
    const latitude = t.latitude ?? t.GPSLatitude
    const longitude = t.longitude ?? t.GPSLongitude
    if (typeof latitude === 'number' && typeof longitude === 'number') {
      lat = String(latitude)
      lon = String(longitude)
    }
    return {
      Camera: camera,
      Lens: lens,
      FocalLength: focalStr,
      fStop,
      DateTimeOriginal: dt,
      Latitude: lat,
      Longitude: lon,
    }
  } catch {
    return { ...emptyExif }
  }
}

/**
 * Fallback metadata from Lightroom payload XMP fields when JPEG rendition strips EXIF.
 */
export function exifFromPayloadXmp(payload: Record<string, unknown> | undefined): ExifStrings {
  if (!payload) return { ...emptyExif }
  const xmp = obj(payload.xmp)
  const tiff = obj(xmp?.tiff)
  const exif = obj(xmp?.exif)
  const aux = obj(xmp?.aux)
  const location = obj(payload.location)

  const make = str(tiff?.Make)
  const model = str(tiff?.Model)
  const camera = [make, model].filter(Boolean).join(' ').trim()
  const lens = str(aux?.Lens) || str(aux?.LensInfo) || str(exif?.LensModel) || str(exif?.Lens)
  const focal = flattenFractionLike(exif?.FocalLength)
  const fStop = flattenFractionLike(exif?.FNumber) || flattenFractionLike(exif?.ApertureValue)
  const dt = str(exif?.DateTimeOriginal) || str(payload.captureDate)

  // GPS may appear in different places depending on source.
  const latitudeRaw =
    exif?.GPSLatitude ?? exif?.latitude ?? payload.latitude ?? location?.latitude
  const longitudeRaw =
    exif?.GPSLongitude ?? exif?.longitude ?? payload.longitude ?? location?.longitude
  const latitude = typeof latitudeRaw === 'number' ? String(latitudeRaw) : str(latitudeRaw)
  const longitude = typeof longitudeRaw === 'number' ? String(longitudeRaw) : str(longitudeRaw)

  return {
    Camera: camera,
    Lens: lens,
    FocalLength: focal,
    fStop,
    DateTimeOriginal: dt,
    Latitude: latitude,
    Longitude: longitude,
  }
}

export function mergeExif(primary: ExifStrings, fallback: ExifStrings): ExifStrings {
  return {
    Camera: primary.Camera || fallback.Camera,
    Lens: primary.Lens || fallback.Lens,
    FocalLength: primary.FocalLength || fallback.FocalLength,
    fStop: primary.fStop || fallback.fStop,
    DateTimeOriginal: primary.DateTimeOriginal || fallback.DateTimeOriginal,
    Latitude: primary.Latitude || fallback.Latitude,
    Longitude: primary.Longitude || fallback.Longitude,
  }
}

export function buildPictureMetadata(
  row: LrAlbumAsset,
  exif: ExifStrings,
  payloadOverride?: Record<string, unknown>
): {
  Title: string
  Caption: string
  DateTimeOriginal: string
} {
  const payload = payloadOverride ?? row.payload
  const title = titleFromPayload(payload, row.label)
  const caption = captionFromPayload(payload)
  const fromPayload = captureDateFromPayload(payload)
  const dt = fromPayload || exif.DateTimeOriginal || ''
  return { Title: title, Caption: caption, DateTimeOriginal: dt }
}
