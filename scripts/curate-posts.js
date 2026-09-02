#!/usr/bin/env node
/**
 * Bulk content-curation helper for content/Blog.
 *
 * Manages four frontmatter-driven states used to triage old posts (see
 * docs/content-curation.md for the full picture):
 *
 *   noindex     -> adds <meta name="robots" content="noindex">, post stays
 *                  fully visible in /blog/, RSS, tags, related, search.
 *   historical  -> renders a "kept for historical interest" banner on the
 *                  post (no build/SEO effect).
 *   archive     -> sets draft: true AND moves the file out of content/Blog
 *                  into archived-posts/, so it's fully excluded from the
 *                  live build. `restore` reverses this.
 *
 * Every mutating command also stamps `curated: <today>` on the post, so it's
 * easy to tell later which of the 995 posts have already been reviewed.
 *
 * Usage:
 *   node scripts/curate-posts.js noindex <slug...>
 *   node scripts/curate-posts.js un-noindex <slug...>
 *   node scripts/curate-posts.js historical <slug...>
 *   node scripts/curate-posts.js un-historical <slug...>
 *   node scripts/curate-posts.js archive <slug...>
 *   node scripts/curate-posts.js restore <slug...>
 *   node scripts/curate-posts.js reviewed <slug...>
 *
 * Any command also accepts `--file <path>` instead of (or in addition to)
 * listing slugs on the command line: a text file with one slug per line
 * (blank lines and lines starting with # are ignored).
 *
 * Slugs are filenames without the .md extension and without any directory,
 * e.g. `spiderman-2-the-game-not-the-movie`.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const matter = require("gray-matter");

const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "Blog");
const ARCHIVE_DIR = path.join(ROOT, "archived-posts");

function today() {
  return new Date().toISOString().slice(0, 10);
}

function slugFromInput(input) {
  return path.basename(input.trim(), ".md");
}

function readSlugsFromFile(filePath) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(abs, "utf8");
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map(slugFromInput);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args[0];
  const rest = args.slice(1);
  const slugs = [];
  let fileArg = null;

  for (let i = 0; i < rest.length; i += 1) {
    if (rest[i] === "--file") {
      fileArg = rest[i + 1];
      i += 1;
    } else {
      slugs.push(slugFromInput(rest[i]));
    }
  }

  if (fileArg) {
    slugs.push(...readSlugsFromFile(fileArg));
  }

  // De-dupe, preserve order.
  const seen = new Set();
  const uniqueSlugs = slugs.filter((s) => (seen.has(s) ? false : (seen.add(s), true)));

  return { command, slugs: uniqueSlugs };
}

function loadPost(file) {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function writePost(file, data, content) {
  const next = matter.stringify(content, data);
  fs.writeFileSync(file, next.endsWith("\n") ? next : `${next}\n`, "utf8");
}

function gitMv(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    execFileSync("git", ["mv", src, dest], { cwd: ROOT, stdio: "pipe" });
  } catch (err) {
    // Not tracked, not a git repo, etc. — fall back to a plain filesystem
    // move so the command still succeeds; caller is told to `git add` it.
    fs.renameSync(src, dest);
    console.warn(
      `  (git mv failed, moved on disk instead — you'll need to 'git add' ${path.relative(ROOT, dest)} manually: ${err.message.split("\n")[0]})`
    );
  }
}

function setNoindex(slug, value) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) throw new Error(`Not found in content/Blog: ${slug}`);
  const { data, content } = loadPost(file);
  if (value) data.noindex = true;
  else delete data.noindex;
  data.curated = today();
  writePost(file, data, content);
  console.log(`${value ? "noindex" : "un-noindex"}: ${slug}`);
}

function setHistorical(slug, value) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) throw new Error(`Not found in content/Blog: ${slug}`);
  const { data, content } = loadPost(file);
  if (value) data.historical = true;
  else delete data.historical;
  data.curated = today();
  writePost(file, data, content);
  console.log(`${value ? "historical" : "un-historical"}: ${slug}`);
}

function markReviewed(slug) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) throw new Error(`Not found in content/Blog: ${slug}`);
  const { data, content } = loadPost(file);
  data.curated = today();
  writePost(file, data, content);
  console.log(`reviewed: ${slug}`);
}

function archivePost(slug) {
  const src = path.join(BLOG_DIR, `${slug}.md`);
  const dest = path.join(ARCHIVE_DIR, `${slug}.md`);
  if (!fs.existsSync(src)) throw new Error(`Not found in content/Blog: ${slug}`);
  if (fs.existsSync(dest)) throw new Error(`Already exists in archived-posts: ${slug}`);

  gitMv(src, dest);

  const { data, content } = loadPost(dest);
  data.draft = true;
  data.archivedDate = today();
  data.curated = today();
  writePost(dest, data, content);
  console.log(`archive: ${slug} -> archived-posts/${slug}.md`);
}

function restorePost(slug) {
  const src = path.join(ARCHIVE_DIR, `${slug}.md`);
  const dest = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(src)) throw new Error(`Not found in archived-posts: ${slug}`);
  if (fs.existsSync(dest)) throw new Error(`Already exists in content/Blog: ${slug}`);

  gitMv(src, dest);

  const { data, content } = loadPost(dest);
  delete data.draft;
  delete data.archivedDate;
  writePost(dest, data, content);
  console.log(`restore: archived-posts/${slug}.md -> content/Blog/${slug}.md`);
}

const COMMANDS = {
  noindex: (slug) => setNoindex(slug, true),
  "un-noindex": (slug) => setNoindex(slug, false),
  historical: (slug) => setHistorical(slug, true),
  "un-historical": (slug) => setHistorical(slug, false),
  archive: (slug) => archivePost(slug),
  restore: (slug) => restorePost(slug),
  reviewed: (slug) => markReviewed(slug),
};

function printUsage() {
  console.log(`Bulk content-curation helper for content/Blog (see docs/content-curation.md)

Commands:
  noindex <slug...>        Add noindex: true (stays in listing/RSS/search)
  un-noindex <slug...>     Remove noindex: true
  historical <slug...>     Add historical: true (renders the "kept for
                            historical interest" banner)
  un-historical <slug...>  Remove historical: true
  archive <slug...>        Set draft: true, stamp archivedDate, and move the
                            post from content/Blog to archived-posts/
  restore <slug...>        Reverse of archive: move back to content/Blog and
                            drop draft/archivedDate
  reviewed <slug...>       Stamp curated: <today> only, no other change
                            (for the "leave alone / evergreen" bucket)

Any command also accepts:
  --file <path>            One slug per line (blank lines / lines starting
                            with # are ignored); combined with any slugs also
                            given on the command line
`);
}

function main() {
  const { command, slugs } = parseArgs(process.argv);
  const handler = COMMANDS[command];

  if (!handler) {
    printUsage();
    process.exitCode = command ? 1 : 0;
    return;
  }

  if (slugs.length === 0) {
    console.error("No slugs given (pass them directly or via --file).");
    process.exitCode = 1;
    return;
  }

  let failures = 0;
  for (const slug of slugs) {
    try {
      handler(slug);
    } catch (err) {
      failures += 1;
      console.error(`  ERROR ${slug}: ${err.message}`);
    }
  }

  console.log(`Done: ${slugs.length - failures}/${slugs.length} succeeded.`);
  if (failures > 0) process.exitCode = 1;
}

main();
