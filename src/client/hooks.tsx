import { useAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

import { authenticateIDX, idx } from './idx'
import { uploadImage } from './ipfs'
import { idxAuth, getLocalDID, setLocalDID } from './state'
import type { IDXAuth } from './state'

export function useIDXAuth(): [IDXAuth, (paths?: Array<string>) => Promise<string>] {
  const [auth, setAuth] = useAtom(idxAuth)

  const authenticate = useCallback(
    async (paths?: Array<string>): Promise<string> => {
      void setAuth({ state: 'LOADING', id: auth.id })
      try {
        await authenticateIDX(paths)
        setLocalDID(idx.id)
        void setAuth({ state: 'CONFIRMED', id: idx.id })
        return idx.id
      } catch (err) {
        void setAuth({ state: 'ERROR', id: auth.id, error: err as Error })
        throw err
      }
    },
    [auth.id, setAuth]
  )

  useEffect(() => {
    if (idx.authenticated) {
      setLocalDID(idx.id)
      if (auth.state !== 'CONFIRMED' || auth.id !== idx.id) {
        void setAuth({ state: 'CONFIRMED', id: idx.id })
      }
    } else if (auth.state === 'UNKNOWN') {
      const id = getLocalDID()
      if (id) {
        void setAuth({ state: 'LOCAL', id })
      }
    }
  }, [auth.id, auth.state, setAuth])

  return [auth, authenticate]
}

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
