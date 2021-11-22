import { selectImageSource } from '@self.id/framework'
import type { Dimensions, ImageSources } from '@self.id/framework'

import { IPFS_URL } from './constants'

export function formatDID(did: string, maxLength = 20): string {
  const half = Math.floor(maxLength / 2)
  const remaining = half - 3 - maxLength
  return did.length <= maxLength ? did : `${did.slice(0, half)}...${did.slice(remaining)}`
}

const ethAddressRegex = /^0x[0-9a-f]{40}$/i
export function isEthereumAddress(address: string): boolean {
  return ethAddressRegex.test(address)
}

export function isSupportedDID(did: string): boolean {
  return did.startsWith('did:3') || did.startsWith('did:key')
}

export function getImageURL(
  sources: ImageSources | undefined,
  dimensions: Dimensions
): string | undefined {
  if (sources == null) {
    return
  }
  const image = selectImageSource(sources, dimensions)
  return image.src.replace('ipfs://', IPFS_URL)
}
