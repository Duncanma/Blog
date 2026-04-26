import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'

/** Config directory for tokens and OAuth pending state (XDG-style on all platforms). */
export function getConfigDir(): string {
  if (process.env.XDG_CONFIG_HOME && process.env.XDG_CONFIG_HOME.trim() !== '') {
    return path.join(process.env.XDG_CONFIG_HOME, 'album-creator')
  }
  if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'album-creator')
  }
  return path.join(os.homedir(), '.config', 'album-creator')
}

export function ensureConfigDir(): string {
  const dir = getConfigDir()
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 })
  return dir
}
