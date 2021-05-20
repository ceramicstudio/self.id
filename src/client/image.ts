import Pica from 'pica'

import type { Dimensions, SizeMode } from '../sdk/images'

const pica = new Pica()

export type SizedImage = Dimensions & { blob: Blob }

const DEFAULT_DIMENSIONS: Dimensions = {
  height: 512,
  width: 512,
}

function getDimensions(
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
