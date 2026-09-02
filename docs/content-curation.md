# Content curation for old posts

With ~1000 posts going back to 2003, a lot of them are dated in a way that either doesn't matter (personal essays that age fine) or actively hurts (event announcements, reactions to now-dead external links). This is the frontmatter/tooling used to triage that without deleting anything.

## The fields

| Field | Effect | Where it's used |
|---|---|---|
| `noindex: true` | Adds `<meta name="robots" content="noindex">`. Post stays fully visible in `/blog/`, RSS, tag pages, related-posts, and on-site search — it's just excluded from search engines and from `sitemap.xml`. | `layouts/partials/extra-head.html`, `layouts/sitemap.xml` |
| `historical: true` | Renders a small "kept for historical/nostalgic interest" banner under the title. No build or SEO effect. | `layouts/posts/single.html` |
| `draft: true` + file moved to `archived-posts/` | Fully excluded from `npm run build` (Hugo's `buildDrafts = false`) *and* physically out of `content/Blog/`, so day-to-day the folder only has live/pending posts. | Hugo core (`config.toml`), `archived-posts/` (outside `contentDir`) |
| `curated: <date>` | No rendering effect — just a marker that a post has already been reviewed by this project, so a future pass can tell what's already been triaged. | none (bookkeeping only) |
| `hidden: true` *(pre-existing, unrelated to this project)* | noindex **and** removed from `/blog/` listing, RSS, and related-posts. Used on 3 personal posts. Stronger than `noindex: true` above — don't confuse the two. | `themes/hello-friend-ng/layouts/partials/head.html`, `_default/list.html`, `_default/rss.xml`, `partials/related.html` |

## `scripts/curate-posts.js`

```bash
node scripts/curate-posts.js noindex <slug...>
node scripts/curate-posts.js un-noindex <slug...>
node scripts/curate-posts.js historical <slug...>
node scripts/curate-posts.js un-historical <slug...>
node scripts/curate-posts.js archive <slug...>
node scripts/curate-posts.js restore <slug...>
node scripts/curate-posts.js reviewed <slug...>
```

`reviewed` just stamps `curated: <today>` with no other change — for the "leave alone / evergreen" bucket, which doesn't get a field of its own otherwise.

A slug is the filename without `.md`, e.g. `spiderman-2-the-game-not-the-movie`. Every command also accepts `--file <path>` for batch mode — a text file with one slug per line (blank lines and `#` comments ignored), which is how the bulk triage report gets applied.

`archive` sets `draft: true` + `archivedDate` and `git mv`s the file into `archived-posts/`. `restore` reverses that exactly — moves it back to `content/Blog/` and drops both fields. Both preserve git history via `git mv` (falls back to a plain filesystem move, with a warning to `git add` manually, if the file isn't tracked).

After archiving posts, run `npm run og-images:prune` to delete their now-orphaned social-card images (it already skips `draft: true` posts and prunes anything not referenced by the current file set — no special-casing needed for `archived-posts/`, it's just outside `content/Blog` so it's already invisible to that script).

## Restoring something

Changed your mind about an archived post? `node scripts/curate-posts.js restore <slug>` and it's back exactly where it was. Same idea for `un-noindex`/`un-historical`.
