# Archived posts

Posts moved here by `node scripts/curate-posts.js archive <slug>` are outside Hugo's `contentDir` (see `config.toml`), so they're never built or published — this is the "goes away from the live site" bucket.

They're still full `.md` files with normal frontmatter (plus `draft: true` and `archivedDate`), just parked outside `content/Blog/` so the live-post folder stays uncluttered.

To bring one back: `node scripts/curate-posts.js restore <slug>`. See [docs/content-curation.md](../docs/content-curation.md) for the full picture.
