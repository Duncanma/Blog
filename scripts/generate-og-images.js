#!/usr/bin/env node
/**
 * Generates a custom og:image (1200x630 PNG) for every Blog post.
 *
 * - If the post's frontmatter has an `images` entry, that photo is used
 *   alongside the title in the card.
 * - Otherwise a text-only card is generated from the title + description.
 *
 * Renders with Satori (layout/SVG) + resvg (SVG -> PNG). Output is cached in
 * data/og_images.json, keyed by a hash of the title/description/tag/image
 * fingerprint, so unchanged posts are skipped on the next run. The hash is
 * also baked into the output filename, so an edited post gets a brand new
 * image URL instead of overwriting a stable one that browsers/CDNs/social
 * previews may already have cached.
 *
 * Editing a post or deleting one leaves its old PNG(s) on disk as orphans
 * (harmless — nothing references them once the manifest moves on) unless
 * you pass --prune, which deletes any static/og-images/*.png not referenced
 * by the current manifest: `node scripts/generate-og-images.js --prune`.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const matter = require("gray-matter");
const satori = require("satori").default;
const { Resvg } = require("@resvg/resvg-js");

const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "Blog");
const OUT_DIR = path.join(ROOT, "static", "og-images");
const MANIFEST_PATH = path.join(ROOT, "data", "og_images.json");
const FONT_DIR = path.join(ROOT, "themes", "hello-friend-ng", "static", "fonts");

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 64;
const IMAGE_PANEL_WIDTH = 400;

// Bump this when the card design changes to force every post to regenerate.
const TEMPLATE_VERSION = "4";

const COLORS = {
  background: "#1F2023",
  title: "#E8E8E8",
  description: "#9AA0A6",
  accent: "#5FB3C4",
};

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

function loadFonts() {
  return [
    { name: "Inter", weight: 400, style: "normal", data: fs.readFileSync(path.join(FONT_DIR, "Inter-UI-Regular.woff")) },
    { name: "Inter", weight: 700, style: "normal", data: fs.readFileSync(path.join(FONT_DIR, "Inter-UI-Bold.woff")) },
    { name: "Source Code Pro", weight: 400, style: "normal", data: fs.readFileSync(path.join(FONT_DIR, "source-code-pro-v9-latin-regular.woff")) },
  ];
}

function resolveLocalImage(imgRef) {
  if (!imgRef || /^https?:\/\//i.test(imgRef)) return null;
  const abs = path.join(ROOT, "static", imgRef.replace(/^\//, ""));
  if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return null;
  const mime = MIME_TYPES[path.extname(abs).toLowerCase()];
  if (!mime) return null;
  return { abs, mime };
}

function titleFontSize(title) {
  if (title.length > 70) return 40;
  if (title.length > 45) return 48;
  return 60;
}

// Satori wraps text using real font metrics, but we still need a rough budget
// up front so long descriptions truncate at a word boundary (with an
// ellipsis) instead of getting hard-clipped by the container's overflow.
function truncateToLines(text, options) {
  const columnWidth = options.columnWidth;
  const fontSize = options.fontSize;
  const maxLines = options.maxLines;
  if (!text) return text;
  const avgCharWidth = fontSize * 0.54; // heuristic for Inter Regular
  const budget = Math.floor((columnWidth / avgCharWidth) * maxLines * 0.96);
  if (text.length <= budget) return text;
  const cut = text.slice(0, budget);
  const lastSpace = cut.lastIndexOf(" ");
  return cut.slice(0, lastSpace > 0 ? lastSpace : budget).trimEnd() + "…";
}

function buildCard(input) {
  const title = input.title;
  const description = input.description;
  const tag = input.tag;
  const imageDataUri = input.imageDataUri;

  const fontSize = titleFontSize(title);
  const lineHeight = 1.15;
  const descFontSize = 22;
  const descLineHeight = 1.35;
  const descLines = 3;
  const columnWidth = (imageDataUri ? WIDTH - IMAGE_PANEL_WIDTH - 3 : WIDTH) - PADDING * 2;
  const clampedDescription = truncateToLines(description, {
    columnWidth: columnWidth,
    fontSize: descFontSize,
    maxLines: descLines,
  });

  const headerRow = tag && {
    type: "div",
    props: {
      style: { display: "flex" },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontFamily: "Source Code Pro",
              fontSize: 20,
              color: COLORS.accent,
              border: "1.5px solid " + COLORS.accent,
              borderRadius: 6,
              padding: "6px 16px",
              letterSpacing: 2,
            },
            children: tag,
          },
        },
      ],
    },
  };

  const titleBlock = {
    type: "div",
    props: {
      style: { display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 22 },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: fontSize,
              lineHeight: lineHeight,
              color: COLORS.title,
              height: fontSize * lineHeight * 3,
              overflow: "hidden",
            },
            children: title,
          },
        },
        clampedDescription && {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: descFontSize,
              lineHeight: descLineHeight,
              color: COLORS.description,
              height: descFontSize * descLineHeight * descLines,
              overflow: "hidden",
            },
            children: clampedDescription,
          },
        },
      ].filter(Boolean),
    },
  };

  const footerRow = {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", fontFamily: "Source Code Pro", fontSize: 20, color: COLORS.description },
            children: "duncanmackenzie.net",
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", fontFamily: "Inter", fontWeight: 700, fontSize: 22, color: COLORS.title },
            children: [
              { type: "span", props: { children: "dm" } },
              { type: "span", props: { style: { color: COLORS.accent }, children: "_" } },
            ],
          },
        },
      ],
    },
  };

  const contentColumn = {
    type: "div",
    props: {
      style: { display: "flex", flexDirection: "column", flex: 1, height: HEIGHT, padding: "56px " + PADDING + "px" },
      children: [headerRow, titleBlock, footerRow].filter(Boolean),
    },
  };

  const imageColumn = imageDataUri && {
    type: "div",
    props: {
      style: { display: "flex", width: IMAGE_PANEL_WIDTH, height: HEIGHT, borderLeft: "3px solid " + COLORS.accent },
      children: [
        {
          type: "img",
          props: {
            src: imageDataUri,
            width: IMAGE_PANEL_WIDTH,
            height: HEIGHT,
            style: { objectFit: "cover", width: IMAGE_PANEL_WIDTH, height: HEIGHT },
          },
        },
      ],
    },
  };

  return {
    type: "div",
    props: {
      style: { display: "flex", width: WIDTH, height: HEIGHT, backgroundColor: COLORS.background },
      children: [
        {
          type: "div",
          props: {
            style: { position: "absolute", top: 0, left: 0, width: WIDTH, height: 4, backgroundColor: COLORS.accent, display: "flex" },
          },
        },
        contentColumn,
        imageColumn,
      ].filter(Boolean),
    },
  };
}

async function renderCard(vnode, fonts) {
  const svg = await satori(vnode, { width: WIDTH, height: HEIGHT, fonts: fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
  return resvg.render().asPng();
}

async function main() {
  const prune = process.argv.slice(2).includes("--prune");
  const fonts = loadFonts();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let manifest = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  }

  const files = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter(function (f) { return f.endsWith(".md"); }) : [];
  const seenSlugs = new Set();
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const slug = path.basename(file, ".md");
    const parsed = matter(fs.readFileSync(filePath, "utf8"));
    const data = parsed.data;

    if (data.draft === true) continue;
    const title = (data.title || "").toString().trim();
    if (!title) continue;

    seenSlugs.add(slug);

    const description = (data.description || "").toString().trim();
    const tag = Array.isArray(data.tags) && data.tags.length ? String(data.tags[0]).toUpperCase() : "";
    const imgRef = Array.isArray(data.images) && data.images.length ? data.images[0] : null;
    const localImage = resolveLocalImage(imgRef);

    const hashParts = [TEMPLATE_VERSION, title, description, tag];
    if (localImage) {
      const stat = fs.statSync(localImage.abs);
      hashParts.push(localImage.abs, String(stat.size), String(stat.mtimeMs));
    } else if (imgRef) {
      hashParts.push("external:" + imgRef);
    }
    const hash = crypto.createHash("sha256").update(hashParts.join("|")).digest("hex").slice(0, 16);

    // The hash is part of the filename (and therefore the public URL), so a
    // content change naturally busts browser/CDN/social-preview caches
    // instead of silently overwriting a stable, already-cached URL.
    const fileName = slug + "-" + hash + ".png";
    const outFile = path.join(OUT_DIR, fileName);
    const existing = manifest[slug];
    if (existing && existing.hash === hash && fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    try {
      const imageDataUri = localImage
        ? "data:" + localImage.mime + ";base64," + fs.readFileSync(localImage.abs).toString("base64")
        : null;
      const vnode = buildCard({ title: title, description: description, tag: tag, imageDataUri: imageDataUri });
      const png = await renderCard(vnode, fonts);
      fs.writeFileSync(outFile, png);

      manifest[slug] = { hash: hash, image: "/og-images/" + fileName };
      generated++;
    } catch (err) {
      errors++;
      console.error("og-images: failed for " + file + ": " + err.message);
    }
  }

  // Posts that no longer exist (deleted, or now draft/untitled) drop out of
  // the manifest here, but their PNG is left on disk unless --prune is set —
  // see the orphan sweep below.
  for (const slug of Object.keys(manifest)) {
    if (!seenSlugs.has(slug)) {
      delete manifest[slug];
    }
  }

  const sorted = Object.keys(manifest)
    .sort()
    .reduce(function (acc, key) {
      acc[key] = manifest[key];
      return acc;
    }, {});
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8");

  const referenced = new Set(Object.values(sorted).map(function (entry) { return path.basename(entry.image); }));
  const onDisk = fs.readdirSync(OUT_DIR).filter(function (f) { return f.endsWith(".png"); });
  const orphans = onDisk.filter(function (f) { return !referenced.has(f); });

  if (prune) {
    orphans.forEach(function (f) { fs.unlinkSync(path.join(OUT_DIR, f)); });
  }

  let summary = "og-images: " + generated + " generated, " + skipped + " cached, " + errors + " failed (" + files.length + " posts scanned).";
  if (orphans.length > 0) {
    summary += prune
      ? " Pruned " + orphans.length + " orphaned file(s)."
      : " " + orphans.length + " orphaned file(s) on disk (run with --prune to delete).";
  }
  console.log(summary);
  if (errors > 0) process.exitCode = 1;
}

main();
