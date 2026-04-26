/**
 * Adobe IMS OAuth (PKCE) for Node CLI — token file storage, no Electron safeStorage.
 * Scopes match Alt-text / Lightroom partner APIs.
 */
import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as http from 'node:http'
import * as https from 'node:https'
import { execFileSync } from 'node:child_process'
import * as path from 'node:path'
import selfsigned from 'selfsigned'
import { ensureConfigDir, getConfigDir } from './paths.js'

const IMS_AUTHORIZE = 'https://ims-na1.adobelogin.com/ims/authorize/v2'
const IMS_TOKEN = 'https://ims-na1.adobelogin.com/ims/token/v3'

export const ADOBE_LIGHTROOM_SCOPES = [
  'openid',
  'AdobeID',
  'lr_partner_apis',
  'lr_partner_rendition_apis',
].join(' ')

/** Default loopback redirect (HTTPS + local self-signed cert). Register this exact URL + a matching pattern in Adobe Developer Console. */
export const DEFAULT_CLI_REDIRECT_URI = 'https://localhost:8765/callback'

/** OAuth Web (confidential) clients require `client_secret` on the IMS token endpoint. */
function getOptionalClientSecret(): string | undefined {
  const s = process.env.ADOBE_CLIENT_SECRET?.trim()
  return s ? s : undefined
}

interface TokenPayload {
  access_token: string
  refresh_token?: string
  expires_at: number
}

function tokensFilePath(): string {
  return path.join(getConfigDir(), 'adobe-tokens.json')
}

function pendingOAuthPath(): string {
  return path.join(getConfigDir(), 'adobe-oauth-pending.json')
}

interface PendingOAuthFile {
  state: string
  codeVerifier: string
  clientId: string
  redirectUri: string
  createdAt: number
}

function writePendingOAuthFile(payload: PendingOAuthFile): void {
  const p = pendingOAuthPath()
  ensureConfigDir()
  fs.writeFileSync(p, JSON.stringify(payload), 'utf-8')
  try {
    fs.chmodSync(p, 0o600)
  } catch {
    // ignore (e.g. Windows)
  }
}

function clearPendingOAuthFile(): void {
  try {
    const p = pendingOAuthPath()
    if (fs.existsSync(p)) fs.unlinkSync(p)
  } catch {
    // ignore
  }
}

function base64Url(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function randomVerifier(): string {
  return base64Url(crypto.randomBytes(32))
}

function challengeS256(verifier: string): string {
  const hash = crypto.createHash('sha256').update(verifier).digest()
  return base64Url(hash)
}

function loadTokens(): TokenPayload | null {
  const p = tokensFilePath()
  if (!fs.existsSync(p)) return null
  try {
    const data = JSON.parse(fs.readFileSync(p, 'utf-8')) as TokenPayload
    if (typeof data.access_token !== 'string' || typeof data.expires_at !== 'number') return null
    return data
  } catch {
    return null
  }
}

function saveTokens(payload: TokenPayload): void {
  ensureConfigDir()
  const p = tokensFilePath()
  fs.writeFileSync(p, JSON.stringify(payload, null, 2), 'utf-8')
  try {
    fs.chmodSync(p, 0o600)
  } catch {
    // ignore
  }
}

export function clearAdobeTokens(): void {
  clearPendingOAuthFile()
  try {
    const p = tokensFilePath()
    if (fs.existsSync(p)) fs.unlinkSync(p)
  } catch {
    // ignore
  }
}

export function isAdobeSignedIn(): boolean {
  return loadTokens() != null
}

async function exchangeCode(
  clientId: string,
  code: string,
  redirectUri: string,
  codeVerifier: string
): Promise<TokenPayload> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  })
  const secret = getOptionalClientSecret()
  if (secret) body.set('client_secret', secret)
  const res = await fetch(IMS_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Adobe token exchange failed (${res.status}): ${text.slice(0, 400)}`)
  }
  const parsed = JSON.parse(text) as { access_token?: string; refresh_token?: string; expires_in?: number }
  if (!parsed.access_token) throw new Error('No access_token in Adobe response')
  const expiresIn = typeof parsed.expires_in === 'number' ? parsed.expires_in : 3600
  const expires_at = Date.now() + expiresIn * 1000 - 60_000
  return {
    access_token: parsed.access_token,
    refresh_token: parsed.refresh_token,
    expires_at,
  }
}

async function refreshTokens(clientId: string, refreshToken: string): Promise<TokenPayload> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: clientId,
    refresh_token: refreshToken,
  })
  const secret = getOptionalClientSecret()
  if (secret) body.set('client_secret', secret)
  const res = await fetch(IMS_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Adobe token refresh failed (${res.status}): ${text.slice(0, 400)}`)
  }
  const parsed = JSON.parse(text) as { access_token?: string; refresh_token?: string; expires_in?: number }
  if (!parsed.access_token) throw new Error('No access_token in refresh response')
  const expiresIn = typeof parsed.expires_in === 'number' ? parsed.expires_in : 3600
  const expires_at = Date.now() + expiresIn * 1000 - 60_000
  return {
    access_token: parsed.access_token,
    refresh_token: parsed.refresh_token ?? refreshToken,
    expires_at,
  }
}

export async function getValidAdobeAccessToken(clientId: string): Promise<string> {
  let tokens = loadTokens()
  if (!tokens) throw new Error('Not signed in. Run: album-creator login')

  if (Date.now() < tokens.expires_at) {
    return tokens.access_token
  }

  if (!tokens.refresh_token) {
    clearAdobeTokens()
    throw new Error('Adobe session expired. Run: album-creator login')
  }

  tokens = await refreshTokens(clientId, tokens.refresh_token)
  saveTokens(tokens)
  return tokens.access_token
}

export function buildAuthorizeUrl(
  clientId: string,
  redirectUri: string
): { url: string; state: string; codeVerifier: string } {
  const codeVerifier = randomVerifier()
  const codeChallenge = challengeS256(codeVerifier)
  const state = crypto.randomBytes(16).toString('hex')
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: ADOBE_LIGHTROOM_SCOPES,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })
  const url = `${IMS_AUTHORIZE}?${params.toString()}`
  return { url, state, codeVerifier }
}

function openBrowser(url: string): void {
  try {
    if (process.platform === 'win32') {
      execFileSync('cmd', ['/c', 'start', '', url], { stdio: 'ignore' })
    } else if (process.platform === 'darwin') {
      execFileSync('open', [url], { stdio: 'ignore' })
    } else {
      execFileSync('xdg-open', [url], { stdio: 'ignore' })
    }
  } catch (e) {
    console.error('Could not open a browser automatically. Open this URL manually:\n', url)
    if (e instanceof Error) console.error(e.message)
  }
}

function parsePortFromRedirectUri(redirectUri: string): number {
  try {
    const u = new URL(redirectUri)
    const port = u.port ? parseInt(u.port, 10) : u.protocol === 'https:' ? 443 : 80
    if (!Number.isFinite(port) || port <= 0) return 8765
    return port
  } catch {
    return 8765
  }
}

/** Ephemeral self-signed cert for local HTTPS OAuth callback (browser will warn once). */
function createLocalhostTlsMaterial(cnHost: string): { key: string; cert: string } {
  const attrs = [{ name: 'commonName', value: cnHost }]
  const pems = selfsigned.generate(attrs, {
    keySize: 2048,
    days: 365,
    algorithm: 'sha256',
    extensions: [
      {
        name: 'subjectAltName',
        altNames: [
          { type: 2, value: 'localhost' },
          { type: 7, ip: '127.0.0.1' },
        ],
      },
    ],
  })
  return { key: pems.private, cert: pems.cert }
}

export interface LoginInteractiveOptions {
  /** Print the full IMS authorize URL (for debugging redirect / wrong app opening). */
  verbose?: boolean
}

/**
 * Run browser OAuth against a loopback redirect. Adobe app must list `redirectUri` (default HTTPS port 8765).
 * Use `https://` + self-signed localhost cert unless you pass `http://` (then plain HTTP is used).
 */
export async function loginInteractive(
  clientId: string,
  redirectUri: string = DEFAULT_CLI_REDIRECT_URI,
  options?: LoginInteractiveOptions
): Promise<void> {
  const trimmed = redirectUri.trim()
  const port = parsePortFromRedirectUri(trimmed)
  const redirectUrl = new URL(trimmed)
  const useHttps = redirectUrl.protocol === 'https:'
  const loopbackOrigin = redirectUrl.origin
  const listenHost = redirectUrl.hostname
  const { url, state, codeVerifier } = buildAuthorizeUrl(clientId, trimmed)

  const verbose = options?.verbose === true
  console.error(`Using OAuth redirect_uri: ${trimmed}`)
  console.error(
    'If an empty Electron window opens after sign-in, Adobe likely redirected to adobe+…:// (registered to that app), not this https URL. Use an OAuth **Web** Client ID whose default + pattern are this redirect, or a separate Web credential for the CLI — see README “Troubleshooting”.'
  )
  if (verbose) {
    console.error('Full authorize URL (check that redirect_uri= matches the line above):\n' + url + '\n')
  }

  writePendingOAuthFile({
    state,
    codeVerifier,
    clientId,
    redirectUri: trimmed,
    createdAt: Date.now(),
  })

  const tlsOpts = useHttps ? createLocalhostTlsMaterial(listenHost) : null
  const server: http.Server | https.Server = tlsOpts
    ? https.createServer({ key: tlsOpts.key, cert: tlsOpts.cert })
    : http.createServer()

  const done = new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      server.close()
      clearPendingOAuthFile()
      reject(new Error('Adobe sign-in timed out (15 minutes).'))
    }, 15 * 60_000)

    server.on('request', (req, res) => {
      try {
        if (!req.url) return
        const incomingPath = new URL(req.url, loopbackOrigin).pathname
        if (incomingPath !== redirectUrl.pathname) {
          res.writeHead(404)
          res.end('Not found')
          return
        }
        const q = new URL(req.url, loopbackOrigin).searchParams
        const code = q.get('code')
        const retState = q.get('state')
        const error = q.get('error')
        const errorDesc = q.get('error_description')

        if (error) {
          res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
          res.end(`<body><p>Adobe returned an error: ${errorDesc || error}</p></body>`)
          clearTimeout(timer)
          server.close()
          clearPendingOAuthFile()
          reject(new Error(errorDesc || error))
          return
        }

        if (!code || retState !== state) {
          res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
          res.end('<body><p>Missing code or invalid state.</p></body>')
          return
        }

        exchangeCode(clientId, code, trimmed, codeVerifier)
          .then((tokens) => {
            saveTokens(tokens)
            clearPendingOAuthFile()
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(
              '<body><p>Signed in to Adobe. You can close this tab and return to the terminal.</p></body>'
            )
            clearTimeout(timer)
            server.close(() => resolve())
          })
          .catch((err) => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(`<body><p>Token exchange failed.</p><pre>${String(err)}</pre></body>`)
            clearTimeout(timer)
            server.close()
            clearPendingOAuthFile()
            reject(err instanceof Error ? err : new Error(String(err)))
          })
      } catch (e) {
        clearTimeout(timer)
        server.close()
        reject(e instanceof Error ? e : new Error(String(e)))
      }
    })

    server.on('error', (err) => {
      clearTimeout(timer)
      clearPendingOAuthFile()
      reject(err)
    })
  })

  await new Promise<void>((resolve, reject) => {
    server.listen(port, listenHost, () => resolve())
    server.once('error', reject)
  })

  if (useHttps) {
    console.error(
      'Listening on',
      loopbackOrigin,
      'with a local self-signed certificate.\n' +
        `Your browser will warn about the certificate — use Advanced / Continue to ${listenHost} (safe for this OAuth step only).`
    )
  }

  console.error('Opening browser for Adobe sign-in…')
  openBrowser(url)

  await done
  console.error('Adobe tokens saved to', tokensFilePath())
}
