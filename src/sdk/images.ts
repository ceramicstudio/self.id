import type { ImageMetadata, ImageSources } from '@ceramicstudio/idx-constants'

import { IPFS_PREFIX, IPFS_URL } from './constants'

export type { ImageMetadata, ImageSources } from '@ceramicstudio/idx-constants'

export type Dimensions = { height: number; width: number }
export type SizeMode = 'contain' | 'cover'

function selectCover(
  options: Array<ImageMetadata>,
  { height, width }: Dimensions
): ImageMetadata | null {
  let selected: ImageMetadata | null = null
  for (const option of options) {
    if (
      option.height >= height &&
      option.width >= width &&
      (selected === null ||
        (selected.size != null && option.size != null && option.size < selected.size) ||
        option.height * option.width < selected.height * selected.width)
    ) {
      selected = option
    }
  }
  return selected
}

function selectContain(
  options: Array<ImageMetadata>,
  { height, width }: Dimensions
): ImageMetadata | null {
  let selected: ImageMetadata | null = null
  for (const option of options) {
    if (
      option.height <= height &&
      option.width <= width &&
      (selected === null ||
        (selected.size != null && option.size != null && option.size < selected.size) ||
        option.height * option.width > selected.height * selected.width)
    ) {
      selected = option
    }
  }
  return selected
}

export function selectImageSource(
  sources: ImageSources,
  dimensions: Dimensions,
  mode: SizeMode = 'cover'
): ImageMetadata {
  let alternative: ImageMetadata | null = null
  if (Array.isArray(sources.alternatives)) {
    alternative =
      mode === 'cover'
        ? selectCover(sources.alternatives, dimensions)
        : selectContain(sources.alternatives, dimensions)
  }
  return alternative ?? sources.original
}

export function toImageSrc(image: ImageMetadata): string {
  return image.src.replace(IPFS_PREFIX, IPFS_URL)
}

export function getImageSrc(sources: ImageSources, dimensions: Dimensions, mode?: SizeMode) {
  return toImageSrc(selectImageSource(sources, dimensions, mode))
}
