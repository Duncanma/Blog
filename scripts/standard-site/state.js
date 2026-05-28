const fs = require("fs");
const path = require("path");
const { root } = require("./config");

const statePath = path.join(root, "data", "standard-site.json");

function loadState() {
  if (!fs.existsSync(statePath)) {
    return { publicationUri: "" };
  }
  const raw = JSON.parse(fs.readFileSync(statePath, "utf8"));
  return {
    publicationUri: raw.publicationUri ?? "",
  };
}

function saveState(state) {
  const payload = {
    publicationUri: state.publicationUri ?? "",
  };
  fs.writeFileSync(statePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function getPublicationUri(state) {
  return state.publicationUri?.trim() ?? "";
}

function normalizePagePath(pathValue) {
  let p = pathValue.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (!p.endsWith("/")) p = `${p}/`;
  return p;
}

module.exports = {
  statePath,
  loadState,
  saveState,
  getPublicationUri,
  normalizePagePath,
};
