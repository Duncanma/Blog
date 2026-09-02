# Azure static site deploy (blob `$web`)

## `.well-known` and CI

The Standard.site publication file must end up at:

`/.well-known/site.standard.publication`

### How it is produced

1. `npm run build` runs `hugo`, then `scripts/sync-standard-publication-well-known.js`.
2. That script writes:
   - `public/.well-known/site.standard.publication` (for upload)
   - `static/.well-known/site.standard.publication` (copied into `public/` by Hugo on the next build)

`publicationUri` is read from `data/standard-site.json` or `config.toml` `[params.standard]`.

### If CI only runs `hugo`

Many pipelines run `hugo` without `npm run build`. In that case the file is still deployed **if** `static/.well-known/site.standard.publication` is committed (Hugo copies `static/` into `public/`).

After changing `publicationUri`, run `npm run build` and commit:

- `static/.well-known/site.standard.publication`
- `data/standard-site.json` / `config.toml` (if updated)

### Recommended pipeline build step

```yaml
- task: NodeTool@0
  inputs:
    versionSpec: "20.x"

- script: npm ci
  displayName: Install dependencies

- script: npm run build
  displayName: Hugo build + .well-known sync
```

Do **not** use `hugo` alone unless `static/.well-known/` is committed and up to date.

### Upload to `duncanmackenzieblog` / `$web`

Use AzCopy's **`sync`**, not `copy`, on the **`public/`** folder. Dot-prefixed paths like `.well-known` are included by default.

```bash
azcopy sync "./public" "https://duncanmackenzieblog.blob.core.windows.net/\$web" --recursive --delete-destination=true
```

**Why `sync` and not `copy`:** `copy` only uploads new/changed files — it never removes a blob from `$web` for a page that's no longer produced by the build. A post that gets `draft: true`'d or moved to `archived-posts/` disappears from `public/` correctly, but under `copy` it silently keeps serving its old content at the live URL forever (confirmed in production: two archived posts were still returning `200` with their pre-archive content, `Last-Modified` weeks stale, after several later deploys had otherwise gone out fine). `sync --delete-destination=true` mirrors `$web` to exactly match `public/`, deleting anything the current build no longer generates.

`sync` takes a plain directory, not a glob — use `"./public"` (no trailing `/*`), unlike the old `copy` example.

The first `sync` run after switching will clean up **any** pre-existing orphaned blobs (old archived/removed posts, the stray `/well-known/` path mentioned below), not just ones from this change — that's expected and desired.

### Verify after deploy

```bash
curl -s https://www.duncanmackenzie.net/.well-known/site.standard.publication
```

Should print your publication AT-URI only (plain text), not HTML.

If you get HTML, you may be hitting the old `/well-known/` path (no leading dot) from an abandoned Hugo page. With the `sync --delete-destination=true` upload above, the next deploy removes it automatically; with the old `copy`-based upload you'd need to delete that blob prefix manually.

### CDN / Front Door

Purge cache for `/.well-known/site.standard.publication` after first deploy if you use a CDN.
