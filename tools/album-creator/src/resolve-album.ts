import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import type { LightroomClient, LrAlbumSummary } from './lightroom-client.js'

export type ResolveAlbumOptions = {
  albumName?: string
  albumId?: string
  albumIndex?: number
}

export type ResolvedAlbum = { id: string; name: string }

export async function loadSortedAlbums(
  lr: LightroomClient,
  catalogBase: string,
  albumsHref: string
): Promise<LrAlbumSummary[]> {
  return lr.listAllAlbums(catalogBase, albumsHref)
}

export async function resolveAlbumForExport(
  lr: LightroomClient,
  catalogBase: string,
  albumsHref: string,
  opts: ResolveAlbumOptions
): Promise<ResolvedAlbum> {
  const albums = await loadSortedAlbums(lr, catalogBase, albumsHref)

  if (opts.albumId) {
    if (opts.albumName) {
      console.warn('album-creator: --album-id takes precedence; ignoring --album.')
    }
    const found = albums.find((a) => a.id === opts.albumId)
    if (!found) {
      throw new Error(`No album with id ${opts.albumId}. Run: album-creator albums`)
    }
    return { id: found.id, name: found.name }
  }

  if (opts.albumIndex != null) {
    const i = opts.albumIndex
    if (!Number.isInteger(i) || i < 1 || i > albums.length) {
      throw new Error(`--album-index must be between 1 and ${albums.length} (same order as "album-creator albums").`)
    }
    const a = albums[i - 1]
    return { id: a.id, name: a.name }
  }

  if (opts.albumName != null) {
    const name = opts.albumName.trim()
    const matches = albums.filter((a) => a.name === name)
    if (matches.length === 0) {
      throw new Error(
        `No album with exact name "${name}". Run: album-creator albums\n` +
          '(Matching is case-sensitive; copy the name from the albums list.)'
      )
    }
    if (matches.length > 1) {
      const lines = matches.map((a) => `  ${a.name}  ${a.updated ?? a.created ?? ''}  ${a.id}`).join('\n')
      throw new Error(`More than one album named "${name}". Pick one id and use --album-id:\n${lines}`)
    }
    return { id: matches[0].id, name: matches[0].name }
  }

  // Interactive
  const rl = readline.createInterface({ input, output })
  try {
    console.log('Albums (same order as `album-creator albums`):')
    const w = Math.max(4, ...albums.map((a) => a.name.length), 30)
    const pad = (s: string, n: number) => (s + ' '.repeat(n)).slice(0, n)
    albums.forEach((a, idx) => {
      const updated = a.updated ?? a.created ?? ''
      console.log(`  ${String(idx + 1).padStart(3)}  ${pad(a.name, w)}  ${updated}`)
    })
    const ans = (await rl.question('Enter number (1–' + albums.length + '): ')).trim()
    const n = parseInt(ans, 10)
    if (!Number.isInteger(n) || n < 1 || n > albums.length) {
      throw new Error(`Invalid choice: "${ans}". Expected an integer 1–${albums.length}.`)
    }
    const a = albums[n - 1]
    return { id: a.id, name: a.name }
  } finally {
    rl.close()
  }
}
