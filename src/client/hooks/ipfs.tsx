import { useCallback, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import toast from 'react-hot-toast'

import type { Dimensions, ImageSources } from '../../sdk'
import { uploadImage } from '../../sdk/web'

const UPLOAD_MAX_SIZE = 2500000

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
        toast.error('Selected image exceeds maximum allowed size')
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
