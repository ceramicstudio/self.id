import type { Dimensions, ImageMetadata, ImageSources, SizeMode } from './types.js'

const DEFAULT_DIMENSIONS: Dimensions = {
  height: 512,
  width: 512,
}

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

/** Select the best option from the given `sources` to match the wanted `dimensions` and `mode`. */
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

/** @internal */
export function getDimensions(
  image: HTMLImageElement,
  dimensions: Dimensions = DEFAULT_DIMENSIONS,
  mode: SizeMode = 'cover'
): Dimensions {
  let width = image.width
  let height = image.height

  if ((mode === 'contain' && width >= height) || (mode === 'cover' && width <= height)) {
    if (width >= dimensions.width) {
      height = Math.round((height * dimensions.width) / width)
      width = dimensions.width
    }
  } else if (height > dimensions.height) {
    width = Math.round((width * dimensions.height) / height)
    height = dimensions.height
  }

  return { width, height }
}
