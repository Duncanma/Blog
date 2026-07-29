# Blog

[![Build status](https://dev.azure.com/festiveturkey0771/festiveturkey/_apis/build/status/festiveturkey-CI)](https://dev.azure.com/festiveturkey0771/festiveturkey/_build/latest?definitionId=2)

[Future post topics](FUTURE_POST_TOPICS.md) — backlog and notes for possible posts (repo only, not on the live site).

[Homegrown analytics dashboard notes](docs/homegrown-analytics-dashboard.md) — setup and wiring for the private analytics page and stats APIs.

[Standard.site / Bluesky link cards](docs/standard-site-setup.md) — publication verification and per-post document records for enhanced Bluesky previews.

## og:image generation

Every post gets a custom 1200×630 social preview card, generated at build time by `scripts/generate-og-images.js` using Satori (layout/SVG) and resvg (SVG → PNG).

### How cards are built

- Posts **with** a frontmatter `images:` entry get a photo panel on the right side of the card alongside the title and description.
- Posts **without** an image get a text-only card using the title and description.

Output lands in `static/og-images/` and is tracked in `data/og_images.json`. The content hash is baked into each filename (`{slug}-{hash}.png`), so editing a post's title, description, or image automatically produces a new URL — no CDN cache-busting required.

### npm scripts

| Script | What it does |
|---|---|
| `npm run og-images` | Regenerate cards for any changed posts; skip unchanged ones |
| `npm run og-images:prune` | Same, plus delete any orphaned PNGs no longer referenced by the manifest |
| `npm run build` | `og-images` → `hugo` → sync well-known files |
| `npm start` | `og-images` → `hugo server` (local dev) |

The generation step runs automatically as part of every build and dev-server start, so you don't need to remember to run it manually.

### Providing a better image for the card

The photo panel is **400×630 px** (portrait, roughly 2:3). Source images are displayed with `object-fit: cover`, so a landscape photo will be center-cropped to fill that space.

If a particular post's image crops awkwardly, you can supply a portrait-cropped version specifically for the card:

1. Crop the image to a **2:3 portrait ratio** (e.g. 800×1200) in any image editor.
2. Save it alongside the original in `static/images/` under a distinct name (e.g. `myimage-og.jpg`).
3. Update the post's frontmatter `images:` to point to the new file.

The script detects the file change, regenerates the card with the new image, and the updated hash gives it a fresh URL automatically. The original image file is unaffected and continues to be used in the post body.

### Forcing a full regeneration

Bump `TEMPLATE_VERSION` at the top of `scripts/generate-og-images.js`. Every post will get a new hash and a new card on the next run.

### YAML note

Description values that contain a colon followed by a space must be wrapped in quotes in the frontmatter, otherwise the YAML parser will error:

```yaml
description: "Short answer: no. The rest of the description."
```
