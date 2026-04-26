# Gallery Creator

`tools/album-creator` is a headless CLI that generates Hugo album markdown from Adobe Lightroom cloud albums, creates resized JPEG variants, uploads them to Azure Blob Storage, and writes hosted URLs into album JSON frontmatter.

This doc describes the **current implementation**.

---

## Quick Start

1. **Install** (repo root): `npm install`.
2. **Configure**: copy `tools/album-creator/.env.example` to `tools/album-creator/.env` (or put the same variables in a `.env` at the blog repo root). Set `ADOBE_CLIENT_ID` and `ADOBE_CLIENT_SECRET` from an Adobe Developer Console OAuth Web app for Lightroom APIs, `AzureConnectionString` for uploads to the `photos` container, and optionally `HASH_KEY` (default matches GalleryMaker). Set `PHOTOS_BASE_URL` or `ALBUM_BASE_URL` if your CDN base differs from the defaults in `.env.example`. For `--generate-captions`, set `CAPTION_PROVIDER`, `CAPTION_MODEL`, and the matching provider API key.
3. **Build**: `npm run build:album-creator`.
4. **Login**: `npm run album-creator -- login` and finish the browser OAuth flow.
5. **Export**: `npm run album-creator -- albums` to list albums, then dry-run and full export:

```bash
npm run album-creator -- export --slug my-album --album "Album Name" --dry-run
npm run album-creator -- export --slug my-album --album "Album Name"
```

Without `--dry-run`, the CLI downloads renditions, uploads JPEG tiers to Azure, and writes `content/albums/my-album.md`. See **Commands** below for `--album-id`, `--album-index`, and other flags.

---

## What It Does

- Authenticates to Adobe Lightroom APIs using OAuth Web credentials.
- Lists albums and resolves a target album by name, id, index, or interactive selection.
- Pulls image metadata from Lightroom (`embed=asset` + `getAsset`) and merges fields.
- Builds per-image variants at target tiers: `2160`, `1080`, `540`, `220`.
- Uploads each variant to Azure Blob container `photos`.
- Writes a markdown file under `content/albums/<slug>.md` with JSON frontmatter.
- Optionally runs in `--dry-run` mode (API metadata only; no image downloads, uploads, or file writes).
- Optionally generates captions using AI providers (headless, env-configured), only when caption is empty in both Lightroom metadata and existing album overrides.

---

## Repo Layout

- CLI code: `tools/album-creator/`
- Main entry: `tools/album-creator/src/cli.ts`
- Export pipeline: `tools/album-creator/src/export-runner.ts`
- Lightroom client/OAuth: `tools/album-creator/src/lightroom-client.ts`, `tools/album-creator/src/adobe-oauth.ts`
- Image processing: `tools/album-creator/src/export-images.ts`
- Azure upload: `tools/album-creator/src/azure-upload.ts`
- Markdown writer: `tools/album-creator/src/write-album-markdown.ts`
- Shared headless AI caption library (external dependency): `/Users/duncanma/Repos/Alt-text/headless-lib`

---

## Commands

From repo root:

```bash
npm run album-creator -- login
npm run album-creator -- albums
npm run album-creator -- export --slug <slug> [options]
```

Common export examples:

```bash
npm run album-creator -- export --slug eagles --album "Eagles"
npm run album-creator -- export --slug eagles --album-id <uuid>
npm run album-creator -- export --slug eagles --album-index 3
npm run album-creator -- export --slug eagles --album "Eagles" --dry-run
npm run album-creator -- export --slug eagles --album "Eagles" --generate-captions
```

---

## Export Inputs and Selection

Album selection precedence:

1. `--album-id` (wins over `--album`, warning printed)
2. `--album-index`
3. `--album`
4. interactive picker

Failure cases:

- no matching album name
- ambiguous matching names
- empty album (or no image assets)

---

## Output Format

Generated markdown is JSON frontmatter in this shape:

- Album: `Outputs`, `Tags`, `Title`, `Description`, `BaseURL`, `Featured`, `startDate`, `Date`, `Pictures`
- Picture: `Title`, `uniqueID`, `Caption`, `Latitude`, `Longitude`, `Camera`, `Lens`, `FocalLength`, `fStop`, `DateTimeOriginal`, `Links`, `catalogId`, `assetId`

`Links[].Url` points at hosted CDN/blob URLs under `BaseURL`.

---

## ID Strategy

`uniqueID` is GalleryMaker-compatible:

- source string: `"{DateTimeOriginal:u}{file-stem}"` (UTC format)
- hash: `HMAC-MD5(source, HASH_KEY)`
- default `HASH_KEY`: `hashbrown`

---

## Metadata Strategy

- Primary metadata source: Lightroom asset payload/XMP (`getAsset` + list embed payload)
- EXIF from downloaded JPEG rendition is used when present
- If rendition EXIF is stripped, fallback maps from payload XMP:
  - camera: `xmp.tiff.Make` + `xmp.tiff.Model`
  - lens: `xmp.aux.Lens` and related fallback fields
  - focal/f-stop/date: `xmp.exif.*`
  - GPS: payload/XMP coordinates when present

Keyword/tag extraction includes XMP fields and excludes import tags:

- `Digital Competition`
- `Print`

---

## Existing Album Merge Behavior

If target markdown already exists, exporter loads and preserves:

- album `Title`
- album `Tags`
- per-image `Title` and `Caption` (matched by `uniqueID`)

This allows reruns without losing manual edits.

---

## Azure Upload Behavior

- Connection string env key: `AzureConnectionString`
- Container: `photos`
- Content type: `image/jpeg`
- Blob path derived from `BaseURL` relative to CDN root:
  - default root: `https://photos.duncanmackenzie.net/`
  - override with `PHOTOS_CDN_ROOT`

---

## Headless Caption Generation

Enabled with `--generate-captions`.

Captions are generated only if both are empty:

1. current Lightroom-derived caption
2. existing album caption override

Env configuration:

- `CAPTION_PROVIDER=anthropic|openai|gemini`
- optional `CAPTION_MODEL`
- provider API key env var (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`)

Post-run summary reports:

- `generated`
- `skipped`
- `failed`

---

## Environment Variables

Primary values used by the CLI:

- `ADOBE_CLIENT_ID`
- `ADOBE_CLIENT_SECRET`
- `AzureConnectionString`
- `PHOTOS_BASE_URL` or `ALBUM_BASE_URL`
- `PHOTOS_CDN_ROOT` (optional)
- `HASH_KEY` (default: `hashbrown`)
- caption env vars (see section above)

See `tools/album-creator/.env.example` for template values.

---

## Notes

- `--dry-run` calls Lightroom metadata APIs but does not write files or upload.
- Full export writes local variants (for traceability) and uploads hosted files.
- Purchase/Stripe flow is intentionally not implemented in this CLI.
