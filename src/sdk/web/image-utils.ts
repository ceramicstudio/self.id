import type { ImageMetadata, ImageSources } from '@ceramicstudio/idx-constants'
import Pica from 'pica'

import { IPFS_PREFIX } from '../constants'
import type { Dimensions, SizeMode } from '../images'

import { uploadFile } from './ipfs'

const pica = new Pica()

export type SizedImage = Dimensions & { blob: Blob }

const DEFAULT_DIMENSIONS: Dimensions = {
  height: 512,
  width: 512,
}

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

export async function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    function onError() {
      reject(new Error('Failed to load image'))
    }

    const image = new Image()
    image.onerror = onError
    image.onload = function () {
      resolve(image)
    }

    const reader = new FileReader()
    reader.onerror = onError
    reader.onload = function (readerEvent) {
      if (readerEvent.target?.result == null) {
        onError()
      } else {
        image.src = readerEvent.target.result as string
      }
    }
    reader.readAsDataURL(blob)
  })
}

export async function resizeImageElement(
  type: string,
  image: HTMLImageElement,
  dimensions?: Dimensions,
  mode?: SizeMode
): Promise<SizedImage> {
  const { width, height } = getDimensions(image, dimensions, mode)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const res = await pica.resize(image, canvas)
  return { blob: await pica.toBlob(res, type), height, width }
}

export async function uploadResizedImage(
  type: string,
  image: HTMLImageElement,
  dimensions?: Dimensions
): Promise<ImageMetadata> {
  const { blob, height, width } = await resizeImageElement(type, image, dimensions)
  const hash = await uploadFile(blob)
  return {
    src: `${IPFS_PREFIX}${hash}`,
    height,
    width,
    mimeType: blob.type,
    size: blob.size,
  }
}

export async function uploadImage(
  file: File,
  sizes: Array<Dimensions> = []
): Promise<ImageSources> {
  const image = await loadImage(file)
  const uploadAlternatives = Promise.all(
    sizes.map(async (dimensions) => await uploadResizedImage(file.type, image, dimensions))
  )
  const [originalHash, alternatives]: [string, Array<ImageMetadata>] = await Promise.all([
    uploadFile(file),
    uploadAlternatives,
  ])
  return {
    alternatives,
    original: {
      src: IPFS_PREFIX + originalHash,
      height: image.height,
      width: image.width,
      mimeType: file.type,
      size: file.size,
    },
  }
}
