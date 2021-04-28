import type { ImageMetadata, ImageSources } from '@ceramicstudio/idx-constants'
import { useCallback, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

import { IPFS_PREFIX } from '../../constants'
import type { Dimensions } from '../../image'
import { loadImage, resizeImageElement } from '../image'
import { addFile } from '../ipfs'

const UPLOAD_MAX_SIZE = 2500000

async function addResizedImage(
  type: string,
  image: HTMLImageElement,
  dimensions?: Dimensions
): Promise<ImageMetadata> {
  const { blob, height, width } = await resizeImageElement(type, image, dimensions)
  const hash = await addFile(blob)
  return {
    src: IPFS_PREFIX + hash,
    height,
    width,
    mimeType: blob.type,
    size: blob.size,
  }
}

async function uploadImage(file: File, sizes: Array<Dimensions> = []): Promise<ImageSources> {
  const image = await loadImage(file)
  const uploadAlternatives = Promise.all(
    sizes.map(async (dimensions) => await addResizedImage(file.type, image, dimensions))
  )
  const [originalHash, alternatives]: [string, Array<ImageMetadata>] = await Promise.all([
    addFile(file),
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

export type UploadState = 'idle' | 'uploading' | 'failed' | 'done'

export type ImageUploadOptions = {
  dimensions?: Array<Dimensions>
  maxSize?: number
}

export function useImageUpload(
  onUpload: (sources: ImageSources) => void,
  options: ImageUploadOptions = {}
) {
  const maxSize = options.maxSize ?? UPLOAD_MAX_SIZE
  const [state, setState] = useState<UploadState>('idle')
  const sourcesRef = useRef<ImageSources | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function resetInput() {
    if (inputRef.current != null) {
      inputRef.current.value = ''
    }
  }

  const trigger = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      sourcesRef.current = null

      const file = e.target?.files?.[0]
      if (file == null || file.size > maxSize) {
        resetInput()
        return
      }

      setState('uploading')

      uploadImage(file, options.dimensions).then(
        (imageSources) => {
          resetInput()
          sourcesRef.current = imageSources
          onUpload(imageSources)
          setState('done')
        },
        (err) => {
          console.warn('Failed to upload image to IPFS', err)
          setState('failed')
        }
      )
    },
    [maxSize, options.dimensions, onUpload]
  )

  const input = (
    <input
      accept="image/png, image/jpeg"
      onChange={onChange}
      ref={inputRef}
      style={{ display: 'none' }}
      type="file"
    />
  )

  return { input, state, trigger, value: sourcesRef.current }
}
