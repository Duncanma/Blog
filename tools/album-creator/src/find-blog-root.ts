import * as fs from 'node:fs'
import * as path from 'node:path'

/** Walk upward from `start` looking for `hugo.toml` or `config.toml` (Hugo). */
export function findBlogRoot(start = process.cwd()): string | null {
  let dir = path.resolve(start)
  for (;;) {
    for (const name of ['hugo.toml', 'config.toml']) {
      const p = path.join(dir, name)
      if (fs.existsSync(p)) return dir
    }
    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}
