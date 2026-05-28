#!/usr/bin/env node
/**
 * Writes public/.well-known/site.standard.publication from config.toml
 * params.standard.publicationUri (run after hugo).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const configPath = path.join(root, "config.toml");
const statePath = path.join(root, "data", "standard-site.json");
const outDir = path.join(root, "public", ".well-known");
const outFile = path.join(outDir, "site.standard.publication");

function readPublicationUri() {
  if (fs.existsSync(statePath)) {
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    const fromState = state.publicationUri?.trim();
    if (fromState) return fromState;
  }
  const config = fs.readFileSync(configPath, "utf8");
  const match = config.match(
    /\[params\.standard\][\s\S]*?publicationUri\s*=\s*"([^"]*)"/
  );
  return match?.[1]?.trim() ?? "";
}

const uri = readPublicationUri();

if (!uri) {
  console.warn(
    "standard.site: params.standard.publicationUri is empty; skipping .well-known/site.standard.publication"
  );
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, uri, "utf8");
console.log(`standard.site: wrote ${path.relative(root, outFile)}`);
