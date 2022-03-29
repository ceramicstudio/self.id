import type { Dimensions, ImageSources } from '@self.id/image-utils'
import { selectImageSource } from '@self.id/image-utils'

export function formatDID(did: string, maxLength = 20): string {
  if (maxLength < 12) {
    maxLength = 12
  }
  const half = Math.floor(maxLength / 2)
  const remaining = half - 3 - maxLength
  return did.length <= maxLength ? did : `${did.slice(0, half)}...${did.slice(remaining)}`
}

export function getImageURL(
  ipfsPrefix: string,
  sources: ImageSources | undefined,
  dimensions: Dimensions
): string | undefined {
  if (sources == null) {
    return
  }
  const image = selectImageSource(sources, dimensions)
  return image.src.replace('ipfs://', ipfsPrefix)
}
