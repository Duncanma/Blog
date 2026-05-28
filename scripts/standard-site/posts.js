const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { root } = require("./config");
const { normalizePagePath } = require("./state");

const blogDir = path.join(root, "content", "Blog");

function resolvePostFile(input) {
  if (!input) {
    throw new Error("Provide a post path or slug (e.g. content/Blog/my-post.md or my-post)");
  }

  const candidates = [];
  if (input.endsWith(".md")) {
    candidates.push(path.isAbsolute(input) ? input : path.join(root, input));
  } else {
    const slug = path.basename(input, ".md");
    candidates.push(path.join(blogDir, `${slug}.md`));
    candidates.push(path.join(root, input));
  }

  for (const file of candidates) {
    if (fs.existsSync(file)) return file;
  }

  throw new Error(`Blog post not found for: ${input}`);
}

function postPathFromFile(file) {
  const slug = path.basename(file, ".md");
  return normalizePagePath(`/blog/${slug}/`);
}

function parsePost(file) {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const pagePath = postPathFromFile(file);
  const title = data.title?.trim();
  if (!title) {
    throw new Error(`${file}: missing title in front matter`);
  }

  const date = data.date ? new Date(data.date) : null;
  if (!date || Number.isNaN(date.getTime())) {
    throw new Error(`${file}: missing or invalid date in front matter`);
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.map((t) => String(t).trim()).filter(Boolean)
    : [];

  return {
    file,
    pagePath,
    title,
    description: data.description?.trim() ?? "",
    publishedAt: date.toISOString(),
    tags,
    blueskyPostID: data.blueskyPostID?.trim() ?? "",
    standardDocumentUri: data.standardDocumentUri?.trim() ?? "",
    hasBody: content.trim().length > 0,
  };
}

function listBlogPostFiles() {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(blogDir, name));
}

function writeStandardDocumentUri(file, uri) {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  data.standardDocumentUri = uri;
  const next = matter.stringify(content, data);
  fs.writeFileSync(file, next.endsWith("\n") ? next : `${next}\n`, "utf8");
}

module.exports = {
  blogDir,
  resolvePostFile,
  parsePost,
  listBlogPostFiles,
  postPathFromFile,
  writeStandardDocumentUri,
};
