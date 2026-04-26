/**
 * Load `.env` before reading `process.env`.
 * Order: `tools/album-creator/.env`, then `<cwd>/.env` (overrides on duplicate keys).
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const distDir = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.join(distDir, '..')
const packageEnvPath = path.join(packageRoot, '.env')
const cwdEnvPath = path.join(process.cwd(), '.env')

if (fs.existsSync(packageEnvPath)) {
  dotenv.config({ path: packageEnvPath })
}

if (fs.existsSync(cwdEnvPath) && path.resolve(cwdEnvPath) !== path.resolve(packageEnvPath)) {
  dotenv.config({ path: cwdEnvPath, override: true })
}
