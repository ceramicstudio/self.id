import type { StreamMetadata } from '@ceramicnetwork/common'
import type { TileDocument } from '@ceramicnetwork/stream-tile'
import {
  EthereumAuthProvider,
  PublicID,
  useClient,
  usePublicRecord,
  useViewerConnection,
  useViewerID,
  useViewerRecord,
} from '@self.id/framework'
import type { PublicRecord, SelfID } from '@self.id/framework'
import { useAtom } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import { useCallback, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { draftNoteAtom, editionStateAtom } from './state'
import type { EditionState, ModelTypes, Note, Notes } from './types'

function useConnect(): () => Promise<SelfID<ModelTypes> | null> {
  const connect = useViewerConnection<ModelTypes>()[1]
  return useCallback(async () => {
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    // @ts-ignore
    return await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
  }, [connect])
}

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
  const client = useClient()
  const queryClient = useQueryClient()
  const viewerID = useViewerID()

  const {
    data: doc,
    isLoading,
    isError,
    error,
  } = useQuery<TileDocument<ContentType>>(
    id,
    async () => await client.tileLoader.load<ContentType>(id)
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
  const connect = useConnect()
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

export function useNote(did: string, id: string) {
  const connect = useConnect()
  const notesRecord = useNotesRecord(did)
  const noteDoc = useTileDoc<Note>(id)
  const [editingText, setEditingText] = useState<string>('')
  const [editionState, setEditionState] = useState<EditionState | null>(null)

  const isValid = editingText !== ''
  const noteItem = notesRecord.content?.notes.find((item) => item.id === `ceramic://${id}`)
  const content =
    noteDoc.content == null || noteItem == null
      ? null
      : { title: noteItem.title, text: noteDoc.content.text }
  const isEditable = content != null && noteDoc.isController
  const isEditing = editionState != null

  const resetEditingText = useCallback(() => {
    setEditingText(content?.text ?? '')
  }, [content])

  const toggleEditing = useCallback(
    (editing: boolean = !isEditing) => {
      if (editing) {
        resetEditingText()
        setEditionState({ status: 'pending' })
      } else {
        setEditionState(null)
      }
    },
    [isEditing, resetEditingText, setEditionState]
  )

  const update = useCallback(async () => {
    if (
      noteDoc.content == null ||
      editionState == null ||
      editionState.status === 'loading' ||
      !isValid
    ) {
      return false
    }
    setEditionState({ status: 'loading' })

    try {
      const selfID = await connect()
      if (selfID == null) {
        setEditionState({ status: 'pending' })
        return false
      }

      if (editingText !== noteDoc.content.text) {
        await noteDoc.update({ ...noteDoc.content, text: editingText })
      }
      setEditionState(null)
    } catch (error) {
      setEditionState({ status: 'failed', error })
    }
  }, [connect, editionState, isValid, editingText, noteDoc, setEditionState])

  return {
    isEditable,
    isEditing,
    isError: notesRecord.isError || noteDoc.isError,
    isLoading: notesRecord.isLoading || noteDoc.isLoading,
    isMutable: noteDoc.isMutable,
    isMutating: noteDoc.isMutating,
    isValid,
    content,
    editingText,
    error: notesRecord.error ?? noteDoc.error,
    resetEditingText,
    setEditingText,
    toggleEditing,
    update,
  }
}
