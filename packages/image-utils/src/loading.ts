import Pica from 'pica'

import { uploadFile } from './ipfs.js'
import { getDimensions } from './selection.js'
import type { Dimensions, ImageMetadata, ImageSources, SizedImage, SizeMode } from './types.js'

const pica = new Pica()

/** Load a `blob` image to an HTML Image element. */
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

/** @internal */
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

/** Resize an image and upload it to IPFS. */
export async function uploadResizedImage(
  url: string,
  type: string,
  image: HTMLImageElement,
  dimensions?: Dimensions
): Promise<ImageMetadata> {
  const { blob, height, width } = await resizeImageElement(type, image, dimensions)
  const hash = await uploadFile(url, blob)
  return {
    src: 'ipfs://' + hash,
    height,
    width,
    mimeType: blob.type,
    size: blob.size,
  }
}

/** Upload an image to IPFS, optionally with additional alternative `sizes`. */
export async function uploadImage(
  url: string,
  file: File,
  sizes: Array<Dimensions> = []
): Promise<ImageSources> {
  const image = await loadImage(file)
  const uploadAlternatives = Promise.all(
    sizes.map(async (dimensions) => await uploadResizedImage(url, file.type, image, dimensions))
  )
  const [originalHash, alternatives]: [string, Array<ImageMetadata>] = await Promise.all([
    uploadFile(url, file),
    uploadAlternatives,
  ])
  return {
    alternatives,
    original: {
      src: 'ipfs://' + originalHash,
      height: image.height,
      width: image.width,
      mimeType: file.type,
      size: file.size,
    },
  }
}
