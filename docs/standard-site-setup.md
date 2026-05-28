# Standard.site and Bluesky enhanced link cards

This site can participate in [Standard.site](https://standard.site/) so Bluesky shows richer link cards when someone shares a post URL. See the [quick start](https://standard.site/docs/quick-start/) and [verification](https://standard.site/docs/verification/) docs.

Your Bluesky DID is in `config.toml` as `params.bluesky.did`. Records are created in **that same AT repo** via the scripts below (no separate PDS to host).

## What the repo does

| Piece | Purpose |
|--------|---------|
| `data/standard-site.json` | Stores `publicationUri` only (commit this file) |
| `standardDocumentUri` in each post | Set by `npm run standard:document` in that post’s front matter |
| `npm run standard:publication` | Creates `site.standard.publication` via AT API (manual, once) |
| `npm run standard:document` | Creates AT record and writes `standardDocumentUri` into the `.md` file |
| `layouts/partials/extra-head.html` | Emits verification `<link>` tags from config/data + front matter |
| `npm run build` | Hugo + writes `/.well-known/site.standard.publication` |

**These AT commands are not part of `npm run build`** so you control timing relative to deploy.

## Setup

1. Copy `.env.example` → `.env` with a [Bluesky app password](https://bsky.app/settings/app-passwords). The scripts load `.env` automatically.
2. `npm install`

## Recommended workflow (deploy timing)

Bluesky verifies the **live** page (link tags + `.well-known`). A deploy can lag git push by a few minutes, so run AT steps **manually** when you know the site state.

### One-time: publication

```bash
# optional: preview
npm run standard:publication -- --dry-run

npm run standard:publication
npm run build
# deploy
curl -s https://www.duncanmackenzie.net/.well-known/site.standard.publication
```

This updates `data/standard-site.json` and `config.toml` `params.standard.publicationUri`.

### Each new blog post

```bash
# 1. Commit post, build, deploy (page live; no document link tag yet)

# 2. After deploy finishes, create AT record
npm run standard:document -- content/Blog/your-post.md
# or: npm run standard:document -- your-post-slug

# 3. Commit the updated .md (standardDocumentUri), build, and deploy again

# 4. Share on Bluesky only after step 3 is live
```

Why two deploys? The live page needs the `<link rel="site.standard.document">` tag, which comes from `standardDocumentUri` in front matter after step 2.

### Backfill

```bash
npm run standard:document -- --missing
```

Skips posts that already have `standardDocumentUri`. Still run `build` + deploy after, then share URLs.

## Commands

| Command | Description |
|---------|-------------|
| `npm run standard:publication` | Create publication record (once) |
| `npm run standard:document -- <file\|slug>` | Create document for one post |
| `npm run standard:document -- --missing` | All posts without a stored URI |
| `--dry-run` | Print record JSON; no API or file writes |
| `--force` | Create even if URI already stored |

Environment:

- `BLUESKY_APP_PASSWORD` (required)
- `BLUESKY_IDENTIFIER` (optional; defaults to `params.bluesky.handle`)

## References

- [Standard.site quick start](https://standard.site/docs/quick-start/)
- [Verification](https://standard.site/docs/verification/)
- [Bluesky integration discussion](https://github.com/bluesky-social/atproto/discussions/4978)
