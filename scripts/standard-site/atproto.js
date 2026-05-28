const { BskyAgent } = require("@atproto/api");
const { readSiteConfig } = require("./config");

function requireAppPassword() {
  const password = process.env.BLUESKY_APP_PASSWORD?.trim();
  if (!password) {
    throw new Error(
      "Set BLUESKY_APP_PASSWORD (Bluesky app password, not your account password)"
    );
  }
  return password;
}

async function createAgent() {
  const { handle } = readSiteConfig();
  const identifier =
    process.env.BLUESKY_IDENTIFIER?.trim() || handle || process.env.BLUESKY_HANDLE?.trim();
  if (!identifier) {
    throw new Error("Set BLUESKY_IDENTIFIER or params.bluesky.handle in config.toml");
  }

  const agent = new BskyAgent({ service: "https://bsky.social" });
  await agent.login({
    identifier,
    password: requireAppPassword(),
  });
  return agent;
}

async function createPublicationRecord(agent, { url, name, description }) {
  const record = {
    $type: "site.standard.publication",
    url: url.replace(/\/$/, ""),
    name,
  };
  if (description) record.description = description;

  const result = await agent.com.atproto.repo.createRecord({
    repo: agent.session.did,
    collection: "site.standard.publication",
    record,
  });

  return result.data.uri;
}

async function createDocumentRecord(
  agent,
  { publicationUri, title, pagePath, description, publishedAt, tags, did, blueskyPostID }
) {
  const record = {
    $type: "site.standard.document",
    site: publicationUri,
    title,
    path: pagePath,
    publishedAt,
  };

  if (description) record.description = description;
  if (tags.length > 0) record.tags = tags;
  if (blueskyPostID && did) {
    record.bskyPostRef = {
      $type: "com.atproto.repo.strongRef",
      uri: `at://${did}/app.bsky.feed.post/${blueskyPostID}`,
    };
  }

  const result = await agent.com.atproto.repo.createRecord({
    repo: agent.session.did,
    collection: "site.standard.document",
    record,
  });

  return result.data.uri;
}

module.exports = {
  createAgent,
  createPublicationRecord,
  createDocumentRecord,
};
