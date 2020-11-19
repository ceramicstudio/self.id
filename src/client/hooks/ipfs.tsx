import { useCallback, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

import { uploadImage } from '../ipfs'

const UPLOAD_MAX_SIZE = 2500000

export type UploadState = 'IDLE' | 'UPLOADING' | 'FAILED' | 'DONE'

export function useImageUpload(onUpload: (hash: string) => void, maxSize = UPLOAD_MAX_SIZE) {
  const [state, setState] = useState<UploadState>('IDLE')
  const hashRef = useRef<string | null>(null)
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
      hashRef.current = null

      const file = e.target?.files?.[0]
      if (file == null || file.size > maxSize) {
        resetInput()
        return
      }

      const data = new FormData()
      data.append('path', file)
      setState('UPLOADING')

      uploadImage(data).then(
        (hash) => {
          resetInput()
          hashRef.current = hash
          onUpload(hash)
          setState('DONE')
        },
        (err) => {
          console.warn('Failed to upload image to IPFS', err)
          setState('FAILED')
        }
      )
    },
    [maxSize, onUpload]
  )

  const input = (
    <input
      accept="image/*"
      onChange={onChange}
      ref={inputRef}
      style={{ display: 'none' }}
      type="file"
    />
  )

  return { input, state, trigger, value: hashRef.current }
}
