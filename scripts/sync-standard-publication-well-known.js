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
const publicOutDir = path.join(root, "public", ".well-known");
const publicOutFile = path.join(publicOutDir, "site.standard.publication");
const staticOutDir = path.join(root, "static", ".well-known");
const staticOutFile = path.join(staticOutDir, "site.standard.publication");
const staleWellKnownDir = path.join(root, "public", "well-known");

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

if (fs.existsSync(staleWellKnownDir)) {
  fs.rmSync(staleWellKnownDir, { recursive: true, force: true });
  console.log(`standard.site: removed stale ${path.relative(root, staleWellKnownDir)}`);
}

function writePublicationFile(outFile) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, uri, "utf8");
}

writePublicationFile(publicOutFile);
writePublicationFile(staticOutFile);
console.log(`standard.site: wrote ${path.relative(root, publicOutFile)}`);
console.log(`standard.site: wrote ${path.relative(root, staticOutFile)} (copied by Hugo when CI runs hugo only)`);
