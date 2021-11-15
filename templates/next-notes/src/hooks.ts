import type { StreamMetadata } from '@ceramicnetwork/common'
import type { TileDocument } from '@ceramicnetwork/stream-tile'
import {
  PublicID,
  useConnection,
  useCore,
  usePublicRecord,
  useViewerID,
  useViewerRecord,
} from '@self.id/framework'
import type { PublicRecord } from '@self.id/framework'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { draftNoteAtom, editionStateAtom } from './state'
import type { ModelTypes, Notes } from './types'

export type TileDoc<ContentType> = {
  isLoading: boolean
  content?: ContentType
  metadata?: StreamMetadata
  isError: boolean
  error?: unknown
  isController: boolean
  isMutable: boolean
  isMutating: boolean
  update(content: ContentType): Promise<void>
}

export function useTileDoc<ContentType>(id: string): TileDoc<ContentType> {
  const queryClient = useQueryClient()
  const core = useCore()
  const viewerID = useViewerID()

  const {
    data: doc,
    isLoading,
    isError,
    error,
  } = useQuery<TileDocument<ContentType>>(
    id,
    async () => await core.tileLoader.load<ContentType>(id)
  )

  const isController = viewerID != null && doc?.metadata.controllers[0] === viewerID.id

  const updateMutation = useMutation(
    async (content: ContentType) => {
      if (viewerID == null || viewerID instanceof PublicID || doc == null) {
        throw new Error('Cannot mutate record')
      }
      await doc.update(content)
      return doc
    },
    {
      onSuccess: (doc: TileDocument<ContentType>) => {
        queryClient.setQueryData(id, doc)
      },
    }
  )

  return {
    content: doc?.content,
    metadata: doc?.metadata,
    error,
    isLoading,
    isError,
    isController,
    isMutable: isController && !(viewerID instanceof PublicID),
    isMutating: updateMutation.isLoading,
    update: async (content: ContentType) => {
      await updateMutation.mutateAsync(content)
    },
  }
}

export function useNotesRecord(did: string): PublicRecord<Notes | null> {
  return usePublicRecord<ModelTypes, 'notes'>('notes', did)
}

export function useDraftNote() {
  const connect = useConnection<ModelTypes>()[1]
  const notesRecord = useViewerRecord<ModelTypes, 'notes'>('notes')
  const [value, setValue] = useAtom(draftNoteAtom)
  const resetValue = useResetAtom(draftNoteAtom)
  const [state, setState] = useAtom(editionStateAtom)

  const isValid = value.text !== '' && value.title !== ''

  const publish = useCallback(async () => {
    if (!notesRecord.isLoadable || state.status === 'loading' || !isValid) {
      return false
    }
    setState({ status: 'loading' })

    try {
      const selfID = await connect()
      if (selfID == null) {
        setState({ status: 'pending' })
        return false
      }

      const doc = await selfID.client.dataModel.createTile('Note', {
        date: new Date().toISOString(),
        text: value.text,
      })
      const notes = notesRecord.content?.notes ?? []
      await notesRecord.set({ notes: [...notes, { id: doc.id.toUrl(), title: value.title }] })

      const notePage = `/${selfID.id}/${doc.id.toString()}`
      setState({ status: 'done', notePage })
      return notePage
    } catch (error) {
      setState({ status: 'failed', error })
    }
  }, [connect, isValid, state, setState, value])

  return { isValid, publish, resetValue, setValue, state, value }
}
