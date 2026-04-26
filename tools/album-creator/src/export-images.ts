import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import sharp from 'sharp'

export const TARGET_WIDTHS = [2160, 1080, 540, 220] as const

export type GeneratedVariant = { width: number; height: number; fileName: string; localPath: string }

/**
 * From a source JPEG buffer, write resized JPEGs (no upscaling) for each target width that is ≤ source width.
 * Widths below source width still get a file at min(target, srcW).
 */
export async function writeResizedJpegSet(
  sourceBuffer: Buffer,
  outDir: string,
  filePrefix: string,
  indexOneBased: number,
  indexPad: number
): Promise<GeneratedVariant[]> {
  await fs.mkdir(outDir, { recursive: true })
  const idx = String(indexOneBased).padStart(indexPad, '0')
  const meta = await sharp(sourceBuffer).rotate().metadata()
  const srcW = meta.width ?? 0
  if (srcW <= 0) throw new Error('Could not read source image width')

  const results: GeneratedVariant[] = []
  for (const targetW of TARGET_WIDTHS) {
    const w = Math.min(targetW, srcW)
    const buf = await sharp(sourceBuffer)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer()
    const m = await sharp(buf).metadata()
    const width = m.width ?? w
    const height = m.height ?? 0
    const fileName = `${filePrefix}-${idx}-${targetW}.jpg`
    const localPath = path.join(outDir, fileName)
    await fs.writeFile(localPath, buf)
    results.push({ width, height, fileName, localPath })
  }
  return results
}
