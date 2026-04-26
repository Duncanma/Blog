declare module '@duncanma/alt-text-headless' {
  export type HeadlessCaptionOptions = {
    provider?: string
    model?: string
    env?: NodeJS.ProcessEnv
  }

  export function generateCaptionFromImageBuffer(
    imageBuffer: Buffer,
    options?: HeadlessCaptionOptions
  ): Promise<string>
}
