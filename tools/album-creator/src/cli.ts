#!/usr/bin/env node
import './load-env.js'
import { clearAdobeTokens, DEFAULT_CLI_REDIRECT_URI, loginInteractive } from './adobe-oauth.js'
import { createLightroomClient } from './lightroom-client.js'
import { runExport } from './export-runner.js'
import { VERSION } from './version.js'

function getClientId(): string {
  const id = process.env.ADOBE_CLIENT_ID?.trim()
  if (!id) {
    console.error(
      'Missing ADOBE_CLIENT_ID. Add it to tools/album-creator/.env or .env in the current directory, or export it in the shell.'
    )
    process.exit(1)
  }
  return id
}

function printHelp(): void {
  console.log(`album-creator ${VERSION}

Usage:
  album-creator login [--redirect-uri <url>] [--verbose]
  album-creator albums
  album-creator logout
  album-creator export --slug <prefix> [options]

export options:
  --slug <prefix>           Required. File prefix and URL segment (e.g. bcn2014).
  --album "<exact name>"   Case-sensitive Lightroom album name.
  --album-id <uuid>        Album id (overrides --album if both set).
  --album-index <n>        1-based index in the same order as \`albums\`.
  (no album flags)         Interactive numbered picker.
  --blog-root <path>       Repo root (default: directory containing hugo.toml).
  --output-md <path>       Markdown file (default: <blog-root>/content/albums/<slug>.md).
  --images-dir <path>      JPEG output folder (default: ./album-export/<slug>).
  --base-url <url>         Full BaseURL for Links (overrides PHOTOS_BASE_URL + slug).
  --title <text>           Album page title (default: Lightroom album name).
  --description <text>   Album description (default empty).
  --featured <n>           Default 0.
  --outputs <list>         Comma-separated, default html (e.g. html,purchase).
  --no-photography-tag     Do not add the "Photography" tag.
  --generate-captions      If caption is empty in Lightroom and existing album data, generate via AI.
  --caption-provider <id>  Optional override: anthropic | openai | gemini (or library-supported id).
  --caption-model <name>   Optional override model name for provider.
  --dry-run                Call Lightroom APIs (list + getAsset per image); do not download
                           renditions or write any files. Prints a summary to stderr.

  Set PHOTOS_BASE_URL (e.g. https://photos.../images) or ALBUM_BASE_URL unless --base-url is passed.

Environment:
  ADOBE_CLIENT_ID      Required. OAuth Web app Client ID from Adobe Developer Console.
  ADOBE_CLIENT_SECRET  Required for OAuth **Web** (confidential) credentials — copy from the
                       same credential page in Console. Omit only if Adobe issued a public
                       client (e.g. some SPA-style configs). Load from .env like the Client ID.
  HASH_KEY             Optional. HMAC key for .NET GalleryMaker-compatible unique IDs.
                       Defaults to "hashbrown".
  CAPTION_PROVIDER     Caption AI provider (anthropic/openai/gemini) for --generate-captions.
  CAPTION_MODEL        Optional model override for caption generation.
  ANTHROPIC_API_KEY / OPENAI_API_KEY / GEMINI_API_KEY
                       Required for the selected CAPTION_PROVIDER.

Login redirect:
  Default loopback URL is ${DEFAULT_CLI_REDIRECT_URI}
  Register this exact redirect URI on your Adobe OAuth app (HTTPS required by Adobe).
  The CLI serves a self-signed certificate; your browser will warn — proceed for localhost only.
`)
}

function parseRedirectUri(args: string[]): string | undefined {
  const i = args.indexOf('--redirect-uri')
  if (i >= 0 && args[i + 1]) return args[i + 1]
  return undefined
}

function takeArg(args: string[], flag: string): string | undefined {
  const i = args.indexOf(flag)
  if (i >= 0 && args[i + 1] && !args[i + 1].startsWith('-')) return args[i + 1]
  return undefined
}

function takeInt(args: string[], flag: string): number | undefined {
  const s = takeArg(args, flag)
  if (s === undefined) return undefined
  const n = parseInt(s, 10)
  if (Number.isNaN(n)) throw new Error(`${flag} expects an integer`)
  return n
}

async function cmdLogin(args: string[]): Promise<void> {
  const clientId = getClientId()
  const verbose = args.includes('--verbose')
  const filtered = args.filter((a) => a !== '--verbose')
  const redirect = parseRedirectUri(filtered) ?? DEFAULT_CLI_REDIRECT_URI
  await loginInteractive(clientId, redirect, { verbose })
}

async function cmdExport(args: string[]): Promise<void> {
  const clientId = getClientId()
  const slug = takeArg(args, '--slug')
  if (!slug) {
    console.error('export requires --slug <prefix> (e.g. bcn2014). See: album-creator --help')
    process.exit(1)
  }
  const albumName = takeArg(args, '--album')
  const albumId = takeArg(args, '--album-id')
  const albumIndex = takeInt(args, '--album-index')
  const outputsRaw = takeArg(args, '--outputs')
  const outputs = outputsRaw
    ? outputsRaw.split(',').map((s) => s.trim()).filter(Boolean)
    : undefined

  await runExport({
    clientId,
    slug,
    album: {
      albumName: albumName ?? undefined,
      albumId: albumId ?? undefined,
      albumIndex: albumIndex ?? undefined,
    },
    blogRoot: takeArg(args, '--blog-root'),
    outputMd: takeArg(args, '--output-md'),
    imagesDir: takeArg(args, '--images-dir'),
    baseUrl: takeArg(args, '--base-url'),
    title: takeArg(args, '--title'),
    description: takeArg(args, '--description'),
    featured: takeInt(args, '--featured'),
    outputs,
    includePhotographyTag: !args.includes('--no-photography-tag'),
    dryRun: args.includes('--dry-run'),
    generateCaptions: args.includes('--generate-captions'),
    captionProvider: takeArg(args, '--caption-provider'),
    captionModel: takeArg(args, '--caption-model'),
  })
}

async function cmdAlbums(): Promise<void> {
  const clientId = getClientId()
  const lr = createLightroomClient(clientId)
  const { base, albumsHref } = await lr.getCatalog()
  const albums = await lr.listAllAlbums(base, albumsHref)
  const wName = Math.max(4, ...albums.map((a) => a.name.length), 30)
  const pad = (s: string, n: number) => (s + ' '.repeat(n)).slice(0, n)
  console.log(`${pad('name', wName)}  updated                    id`)
  for (const a of albums) {
    const updated = a.updated ?? a.created ?? ''
    console.log(`${pad(a.name, wName)}  ${pad(updated, 26)}  ${a.id}`)
  }
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  if (argv.includes('--help') || argv.includes('-h')) {
    printHelp()
    return
  }
  if (argv.includes('--version') || argv.includes('-V')) {
    console.log(VERSION)
    return
  }

  const cmd = argv[0] ?? 'help'
  if (cmd === 'help') {
    printHelp()
    return
  }
  if (cmd === 'login') {
    await cmdLogin(argv.slice(1))
    return
  }
  if (cmd === 'logout') {
    clearAdobeTokens()
    console.error('Adobe tokens cleared.')
    return
  }
  if (cmd === 'albums') {
    await cmdAlbums()
    return
  }
  if (cmd === 'export') {
    await cmdExport(argv.slice(1))
    return
  }

  console.error(`Unknown command: ${cmd}`)
  printHelp()
  process.exit(1)
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e)
  process.exit(1)
})
