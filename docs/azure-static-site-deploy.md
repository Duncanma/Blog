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

Use AzCopy (or equivalent) on the **`public/`** folder with `--recursive`. Dot-prefixed paths like `.well-known` are included by default.

Example:

```bash
azcopy copy "./public/*" "https://duncanmackenzieblog.blob.core.windows.net/\$web" --recursive
```

Use the trailing `/*` or `public/.` pattern so contents land at the container root, not under a `public/` prefix.

### Verify after deploy

```bash
curl -s https://www.duncanmackenzie.net/.well-known/site.standard.publication
```

Should print your publication AT-URI only (plain text), not HTML.

If you get HTML, you may be hitting the old `/well-known/` path (no leading dot) from an abandoned Hugo page—delete that blob prefix in storage or rely on the build script removing `public/well-known/` before upload.

### CDN / Front Door

Purge cache for `/.well-known/site.standard.publication` after first deploy if you use a CDN.
