# album-creator

CLI to generate Hugo album pages from Adobe Lightroom (see `/docs/gallery-creator.md` in the Blog repo).

## Setup

From the Blog repository root:

```bash
npm install
npm run build:album-creator
```

Register an **OAuth Web** app in [Adobe Developer Console](https://developer.adobe.com/) with:

- On the credential page, copy **Client ID** and **Client secret** into `.env` as `ADOBE_CLIENT_ID` and `ADOBE_CLIENT_SECRET`. OAuth **Web** (confidential) clients must send the secret to the IMS token endpoint; without it you get `missing client_secret parameter`.

- **Default redirect URI:** **`https://localhost:8765/callback`** — must match what the CLI sends (see `--redirect-uri`). HTTPS loopback; the CLI uses a short-lived self-signed certificate (the browser will warn; continue to **localhost** for this step only).  
  Override with `album-creator login --redirect-uri …` for another **https** loopback URL; register that **exact** URL as the default redirect. For `http://` only, pass `--redirect-uri http://127.0.0.1:PORT/...` and the CLI listens on HTTP.

- **Redirect URI pattern:** Adobe also requires a [redirect URI pattern](https://developer.adobe.com/developer-console/docs/guides/authentication/UserAuthentication/implementation#redirect-uri-pattern): a regex (comma‑separated list allowed, up to 512 characters). **Dots in hostnames must be escaped as `\.`** (e.g. `127.0.0.1` → `127\.0\.0\.1`).  
  - If you only use the default callback, this is enough: **`https://localhost:8765/callback`**  
  - If you sometimes use **both** `localhost` and `127.0.0.1` with the same port and path: **`https://localhost:8765/callback,https://127\.0\.0\.1:8765/callback`**

- APIs: Lightroom / partner APIs as required for your project

Configure credentials with a **`.env`** file (recommended) or the shell.

**Option A — `tools/album-creator/.env`** (loaded first; repo root `.env` overrides on duplicate keys):

```bash
cp tools/album-creator/.env.example tools/album-creator/.env
# edit ADOBE_CLIENT_ID=… and ADOBE_CLIENT_SECRET=…
# HASH_KEY defaults to hashbrown (GalleryMaker-compatible unique IDs)
```

**Option B — Blog repo root `.env`** when you run `npm run album-creator` from the repo root (overrides the package `.env` for duplicate keys):

```bash
# in Blog root
echo 'ADOBE_CLIENT_ID=your-client-id' >> .env
```

Shell still works: `export ADOBE_CLIENT_ID="…"`

## Commands

```bash
npm run album-creator -- login
npm run album-creator -- login --verbose   # prints full IMS authorize URL (check redirect_uri=)
npm run album-creator -- albums
npm run album-creator -- logout
npm run album-creator -- --version
```

Or after `npm install` inside `tools/album-creator` and `npm run build`:

```bash
node dist/cli.js albums
```

## Export

Requires `login` first. Set **`PHOTOS_BASE_URL`** (parent folder on your CDN, e.g. `https://photos.duncanmackenzie.net/images`) or **`ALBUM_BASE_URL`** (full album folder URL), unless you pass **`--base-url`**.
Set **`AzureConnectionString`** in `.env`; export uploads resized JPEGs to Azure Blob container `photos` before writing markdown.

Writes:

- **`content/albums/<slug>.md`** under the blog root (JSON frontmatter matching existing albums).
- **JPEGs** under `./album-export/<slug>/` by default (`--images-dir` to override).

Examples:

```bash
npm run album-creator -- export --slug mytrip --album "My Trip 2024"
npm run album-creator -- export --slug mytrip --album-id <uuid> --title "My Trip"
npm run album-creator -- export --slug mytrip --album-index 3 --outputs html
npm run album-creator -- export --slug mytrip --album "My Trip" --dry-run
```

**`--dry-run`** still resolves the album, lists image assets, and calls **`getAsset`** per image for metadata (Adobe API). It does **not** download JPEG renditions or write markdown/images. Use it to validate album selection and titles/keywords before a full export.

When writing markdown, the exporter loads an existing target album file (if present) and preserves:

- album `Title`
- album `Tags`
- per-image `Title` and `Caption` (matched by `uniqueID`)

By default, the importer excludes these tags from image keywords before building album `Tags`:

- `Digital Competition`
- `Print`

Interactive picker runs when you omit `--album`, `--album-id`, and `--album-index`. **`--album-id` wins** over `--album` if both are set (a warning is printed).

## Config

Tokens are stored under:

- **macOS:** `~/Library/Application Support/album-creator/`
- **Linux:** `~/.config/album-creator/` (or `$XDG_CONFIG_HOME/album-creator/`)

Files: `adobe-tokens.json`, `adobe-oauth-pending.json` (during login only).

## Troubleshooting

### Empty Electron window after Adobe sign-in

That usually means the OS opened a **custom URL scheme** (often `adobe+…://adobeid/…`) registered to your **Electron** app (e.g. Alt-text Generator), instead of sending the browser to **`https://localhost:8765/callback`** where this CLI listens.

Typical causes:

1. **`ADOBE_CLIENT_ID` is for an OAuth Native / desktop-style credential** whose redirect is the `adobe+…` URI, not the Web https loopback URL.
2. **Same Adobe project** as a desktop app: the wrong credential’s Client ID was copied.

**Fix:** In [Adobe Developer Console](https://developer.adobe.com/console), create or use an **OAuth Web** credential for this CLI, set **default redirect** and **pattern** to `https://localhost:8765/callback` (see above), add Lightroom APIs, and put **that** Client ID in `.env` as `ADOBE_CLIENT_ID`. Keep a separate Web client for the CLI if you still need the `adobe+…` redirect for Electron.

Verify the authorize request: run `album-creator login --verbose` and confirm the printed URL contains `redirect_uri=https%3A%2F%2Flocalhost%3A8765%2Fcallback` (or your `--redirect-uri`). If it shows an `adobe+` redirect instead, the wrong client or credential type is in use.

### Optional AI captions

Use `--generate-captions` to generate captions only when both are empty:

1. Lightroom payload caption/description/alt fields, and
2. existing album file caption (matched by `uniqueID`).

This is headless (no UI). Configure provider via `.env`:

- `CAPTION_PROVIDER=anthropic|openai|gemini`
- optional `CAPTION_MODEL=<model>`
- provider API key env var (`ANTHROPIC_API_KEY` or `OPENAI_API_KEY` or `GEMINI_API_KEY`)

Example:

```bash
npm run album-creator -- export --slug eagles --album "Eagles" --generate-captions
```
