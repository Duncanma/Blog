import { BlobServiceClient } from '@azure/storage-blob'

const DEFAULT_CDN_ROOT = 'https://photos.duncanmackenzie.net/'

function getAzureConnectionString(): string {
  const cs = process.env.AzureConnectionString?.trim()
  if (!cs) {
    throw new Error(
      'Missing AzureConnectionString in .env. This is required for export uploads to Azure Blob.'
    )
  }
  return cs
}

/**
 * Convert a hosted BaseURL (e.g. https://photos.duncanmackenzie.net/images/slug) to blob prefix (images/slug).
 */
function blobPrefixFromBaseUrl(baseUrl: string): string {
  const cdnRoot = (process.env.PHOTOS_CDN_ROOT?.trim() || DEFAULT_CDN_ROOT).replace(/\/+$/, '/')
  if (!baseUrl.startsWith(cdnRoot)) {
    throw new Error(
      `BaseURL ${baseUrl} does not start with configured CDN root ${cdnRoot}. ` +
        'Set PHOTOS_CDN_ROOT in .env if your CDN host differs.'
    )
  }
  return baseUrl.slice(cdnRoot.length).replace(/^\/+/, '').replace(/\/+$/, '')
}

export async function uploadJpegToAzure(baseUrl: string, fileName: string, localPath: string): Promise<void> {
  const cs = getAzureConnectionString()
  const prefix = blobPrefixFromBaseUrl(baseUrl)
  const blobName = `${prefix}/${fileName}`.replace(/\/{2,}/g, '/')
  const serviceClient = BlobServiceClient.fromConnectionString(cs)
  const containerClient = serviceClient.getContainerClient('photos')
  const blobClient = containerClient.getBlockBlobClient(blobName)
  await blobClient.uploadFile(localPath, {
    blobHTTPHeaders: {
      blobContentType: 'image/jpeg',
    },
  })
}
