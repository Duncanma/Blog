import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export type AlbumLink = { Url: string; Width: number; Height: number }

export type AlbumPicture = {
  Title: string
  uniqueID: string
  Caption: string
  Latitude: string
  Longitude: string
  Camera: string
  Lens: string
  FocalLength: string
  fStop: string
  DateTimeOriginal: string
  Links: AlbumLink[]
  catalogId: string
  assetId: string
}

export type AlbumFrontmatter = {
  Outputs: string[]
  Tags: string[]
  Title: string
  Description: string
  BaseURL: string
  Featured: number
  startDate: string
  Date: string
  Pictures: AlbumPicture[]
}

function minMaxIsoDates(dates: string[]): { start: string; end: string } {
  const parsed = dates.map((d) => ({ raw: d, t: Date.parse(d) })).filter((x) => !Number.isNaN(x.t))
  if (parsed.length === 0) return { start: '', end: '' }
  parsed.sort((a, b) => a.t - b.t)
  return { start: parsed[0].raw, end: parsed[parsed.length - 1].raw }
}

export function buildAlbumFrontmatter(input: {
  outputs: string[]
  tags: string[]
  title: string
  description: string
  baseUrl: string
  featured: number
  pictures: AlbumPicture[]
}): AlbumFrontmatter {
  const dates = input.pictures.map((p) => p.DateTimeOriginal).filter(Boolean)
  const { start, end } = minMaxIsoDates(dates)
  return {
    Outputs: input.outputs,
    Tags: input.tags,
    Title: input.title,
    Description: input.description,
    BaseURL: input.baseUrl.replace(/\/$/, ''),
    Featured: input.featured,
    startDate: start,
    Date: end,
    Pictures: input.pictures,
  }
}

export function serializeAlbumMarkdown(doc: AlbumFrontmatter): string {
  const json = JSON.stringify(doc, null, 2)
  return `---\n${json}\n---\n`
}

export async function writeAlbumMarkdownFile(outPath: string, doc: AlbumFrontmatter): Promise<void> {
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, serializeAlbumMarkdown(doc), 'utf-8')
}
