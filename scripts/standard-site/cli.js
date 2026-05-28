#!/usr/bin/env node
/**
 * Manual Standard.site publisher (AT Protocol). Not run during npm run build.
 *
 * Usage:
 *   BLUESKY_APP_PASSWORD=... npm run standard:publication
 *   BLUESKY_APP_PASSWORD=... npm run standard:document -- content/Blog/my-post.md
 *   BLUESKY_APP_PASSWORD=... npm run standard:document -- --missing
 *
 * Add --dry-run to print records without writing to AT Protocol or post front matter.
 */
const path = require("path");
const { readSiteConfig, syncConfigPublicationUri } = require("./config");
const {
  loadState,
  saveState,
  getPublicationUri,
} = require("./state");
const {
  resolvePostFile,
  parsePost,
  listBlogPostFiles,
  writeStandardDocumentUri,
} = require("./posts");
const {
  createAgent,
  createPublicationRecord,
  createDocumentRecord,
} = require("./atproto");

function parseArgs(argv) {
  const args = argv.slice(2);
  const flags = {
    dryRun: false,
    force: false,
    missing: false,
  };
  const positionals = [];

  for (const arg of args) {
    if (arg === "--dry-run") flags.dryRun = true;
    else if (arg === "--force") flags.force = true;
    else if (arg === "--missing") flags.missing = true;
    else positionals.push(arg);
  }

  return { flags, positionals };
}

function printDryRun(label, payload) {
  console.log(`[dry-run] ${label}:`);
  console.log(JSON.stringify(payload, null, 2));
}

async function cmdPublication(flags) {
  const site = readSiteConfig();
  const state = loadState();
  const existing = getPublicationUri(state);

  if (existing && !flags.force) {
    console.log(`Publication already recorded: ${existing}`);
    console.log("Use --force to create another record (usually not needed).");
    return;
  }

  const record = {
    url: site.baseURL.replace(/\/$/, ""),
    name: site.title,
    description: site.description,
  };

  if (flags.dryRun) {
    printDryRun("site.standard.publication", {
      $type: "site.standard.publication",
      ...record,
    });
    return;
  }

  const agent = await createAgent();
  const uri = await createPublicationRecord(agent, record);
  state.publicationUri = uri;
  saveState(state);
  syncConfigPublicationUri(uri);

  console.log(`Created publication: ${uri}`);
  console.log("Next: npm run build && deploy, then verify:");
  console.log(`  curl -s ${site.baseURL}.well-known/site.standard.publication`);
}

async function publishOneDocument(postInput, flags) {
  const site = readSiteConfig();
  const state = loadState();
  let publicationUri = getPublicationUri(state);

  if (!publicationUri && !flags.dryRun) {
    throw new Error(
      "No publicationUri in data/standard-site.json. Run: npm run standard:publication"
    );
  }
  if (!publicationUri && flags.dryRun) {
    publicationUri = "at://did:plc:example/site.standard.publication/placeholder";
  }

  const file = resolvePostFile(postInput);
  const post = parsePost(file);

  if (post.standardDocumentUri && !flags.force) {
    console.log(`${post.pagePath} already has document: ${post.standardDocumentUri}`);
    return;
  }

  const record = {
    publicationUri,
    title: post.title,
    pagePath: post.pagePath,
    description: post.description,
    publishedAt: post.publishedAt,
    tags: post.tags,
    did: site.did,
    blueskyPostID: post.blueskyPostID,
  };

  if (flags.dryRun) {
    printDryRun(`site.standard.document ${post.pagePath}`, {
      $type: "site.standard.document",
      site: publicationUri,
      title: post.title,
      path: post.pagePath,
      description: post.description || undefined,
      publishedAt: post.publishedAt,
      tags: post.tags.length ? post.tags : undefined,
      bskyPostRef: post.blueskyPostID && site.did
        ? { uri: `at://${site.did}/app.bsky.feed.post/${post.blueskyPostID}` }
        : undefined,
    });
    console.log(`[dry-run] would set standardDocumentUri in ${path.relative(process.cwd(), post.file)}`);
    return;
  }

  const agent = await createAgent();
  const uri = await createDocumentRecord(agent, record);
  writeStandardDocumentUri(post.file, uri);

  console.log(`Created document for ${post.pagePath}`);
  console.log(`  ${uri}`);
  console.log(`Updated front matter: ${path.relative(process.cwd(), post.file)}`);
  console.log("Next: npm run build && deploy so the page includes the document link tag.");
  console.log("Share the post URL on Bluesky only after the deploy has finished.");
}

async function cmdDocument(flags, positionals) {
  if (flags.missing) {
    const files = listBlogPostFiles();
    let created = 0;
    for (const file of files) {
      const post = parsePost(file);
      if (post.standardDocumentUri) continue;
      await publishOneDocument(file, flags);
      created += 1;
    }
    if (created === 0) console.log("No posts missing document records.");
    return;
  }

  const target = positionals[0];
  if (!target) {
    throw new Error(
      "Usage: npm run standard:document -- <content/Blog/post.md|slug>\n" +
        "   or: npm run standard:document -- --missing"
    );
  }

  await publishOneDocument(target, flags);
}

async function main() {
  const { flags, positionals } = parseArgs(process.argv);
  const command = positionals[0];

  if (command === "publication") {
    await cmdPublication(flags);
    return;
  }

  if (command === "document") {
    await cmdDocument(flags, positionals.slice(1));
    return;
  }

  console.log(`Standard.site AT Protocol publisher (manual)

Commands:
  publication              Create site.standard.publication (once)
  document <file|slug>     Create site.standard.document for one post
  document --missing       Create documents for posts missing standardDocumentUri

Flags:
  --dry-run    Print records only
  --force      Create even if URI already stored

Environment:
  BLUESKY_APP_PASSWORD   Required (app password from Bluesky settings)
  BLUESKY_IDENTIFIER     Optional; defaults to params.bluesky.handle

State: data/standard-site.json (publicationUri only); document URIs live in post front matter

Recommended workflow (avoids live-site / record timing issues):
  1. npm run standard:publication
  2. npm run build && deploy
  3. Publish blog post in git, build && deploy
  4. npm run standard:document -- content/Blog/your-post.md
  5. npm run build && deploy again (adds link tag to HTML)
  6. Share URL on Bluesky after step 5 completes
`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
