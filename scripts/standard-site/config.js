const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");

function loadEnvFile() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    if (process.env[key]) continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile();

function readConfigToml() {
  return fs.readFileSync(path.join(root, "config.toml"), "utf8");
}

function readSiteConfig() {
  const toml = readConfigToml();
  const baseURL = toml.match(/^baseURL\s*=\s*"([^"]+)"/m)?.[1]?.trim() ?? "";
  const title = toml.match(/^title\s*=\s*"([^"]+)"/m)?.[1]?.trim() ?? "";
  const description =
    toml.match(/^\s*description\s*=\s*"([^"]*)"/m)?.[1]?.trim() ?? "";
  const handle =
    toml.match(/\[params\.bluesky\][\s\S]*?handle\s*=\s*"([^"]+)"/)?.[1]?.trim() ??
    "";
  const did =
    toml.match(/\[params\.bluesky\][\s\S]*?did\s*=\s*"([^"]+)"/)?.[1]?.trim() ??
    "";

  return { baseURL, title, description, handle, did, root };
}

function syncConfigPublicationUri(publicationUri) {
  const configPath = path.join(root, "config.toml");
  let toml = fs.readFileSync(configPath, "utf8");
  const block = /(\[params\.standard\][\s\S]*?publicationUri\s*=\s*)"([^"]*)"/;
  if (!block.test(toml)) {
    throw new Error("config.toml missing [params.standard] publicationUri");
  }
  toml = toml.replace(block, `$1"${publicationUri}"`);
  fs.writeFileSync(configPath, toml, "utf8");
}

module.exports = { readSiteConfig, syncConfigPublicationUri, root };
