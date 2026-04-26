import * as crypto from 'node:crypto'

/**
 * .NET GalleryMaker-compatible ID:
 * HMAC-MD5(sourceId, hashKey) as lowercase hex (32 chars).
 */
export function stableAssetUniqueId(sourceId: string, hashKey: string): string {
  return crypto.createHmac('md5', Buffer.from(hashKey, 'ascii')).update(sourceId, 'ascii').digest('hex')
}

/** Match C# DateTimeOffset formatting with :u => "yyyy-MM-dd HH:mm:ssZ" (UTC). */
function formatUtcForSourceId(isoLike: string): string {
  const t = Date.parse(isoLike)
  if (Number.isNaN(t)) return ''
  const iso = new Date(t).toISOString() // yyyy-mm-ddTHH:mm:ss.sssZ
  return iso.replace('T', ' ').replace(/\.\d{3}Z$/, 'Z')
}

export function makeGalleryMakerSourceId(dateTimeOriginal: string, fileStem: string): string {
  return `${formatUtcForSourceId(dateTimeOriginal)}${fileStem}`
}
