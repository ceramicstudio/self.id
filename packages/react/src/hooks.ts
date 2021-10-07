import type { DefinitionContentType } from '@glazed/did-datastore'
import { PublicID } from '@self.id/core'
import type { Core, CoreModelTypes } from '@self.id/core'
import type { AuthenticateParams, EthereumAuthProvider, SelfID } from '@self.id/web'
import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { stateScope, connectionAtom, clientConfigAtom, coreAtom, viewerIDAtom } from './state'
import type { ViewerConnectionState } from './types'
import { abortable } from './utils'

async function authenticateSelfID<ModelTypes extends CoreModelTypes = CoreModelTypes>(
  params: AuthenticateParams<ModelTypes>
): Promise<SelfID<ModelTypes>> {
  const { SelfID } = await import('@self.id/web')
  return await SelfID.authenticate<ModelTypes>(params)
}

export function useCore<ModelTypes extends CoreModelTypes = CoreModelTypes>(): Core<ModelTypes> {
  return useAtomValue(coreAtom, stateScope)
}

export type ViewerID<ModelTypes extends CoreModelTypes> = PublicID<ModelTypes> | SelfID<ModelTypes>

export function useViewerID<
  ModelTypes extends CoreModelTypes = CoreModelTypes
>(): ViewerID<ModelTypes> | null {
  return useAtomValue(viewerIDAtom, stateScope)
}

export function useViewerConnection(): [
  ViewerConnectionState,
  (provider: EthereumAuthProvider) => Promise<SelfID | null>,
  () => void
] {
  const config = useAtomValue(clientConfigAtom, stateScope)
  const [connection, setConnection] = useAtom(connectionAtom, stateScope)
  const setViewerID = useUpdateAtom(viewerIDAtom, stateScope)

  const connect = useCallback(
    async (provider: EthereumAuthProvider): Promise<SelfID | null> => {
      if (connection.status === 'connecting' && connection.provider === provider) {
        return await connection.promise
      }

      if (connection.status === 'connecting') {
        connection.promise.abort()
      }
      try {
        const promise = abortable(
          authenticateSelfID({ ...config, authProvider: provider }).then((selfID) => {
            if (promise.signal.aborted) {
              void setConnection({ status: 'idle' })
              return null
            }
            void setViewerID(selfID)
            return selfID
          })
        )
        void setConnection({ status: 'connecting', provider, promise })
        return await promise
      } catch (err) {
        void setConnection({ status: 'failed', error: err as Error })
        return null
      }
    },
    [connection, setConnection, setViewerID]
  )

  const reset = useCallback(() => {
    void setViewerID(null)
  }, [setViewerID])

  return [connection, connect, reset]
}

export type ViewerRecord<ContentType> =
  | {
      // No viewerID -> not loadable
      isLoadable: false
      isLoading: false
      content?: never
      isError: false
      error?: never
      isMutable: false
      isMutating: false
      set?: never
      merge?: never
    }
  | ({
      // With viewerID -> loadable
      isLoadable: true
      isLoading: boolean
      content?: ContentType
      isError: boolean
      error?: unknown
    } & (
      | { isMutable: false; isMutating: false } // Read-only (PublicID)
      | {
          // Read/write (SelfID)
          isMutable: true
          isMutating: boolean
          set(content: ContentType): Promise<void>
          merge(content: ContentType): Promise<void>
        }
    ))

export function useViewerRecord<
  ModelTypes extends CoreModelTypes = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions'],
  ContentType = DefinitionContentType<ModelTypes, Alias>
>(alias: Alias): ViewerRecord<ContentType | null> {
  const viewerID = useViewerID<ModelTypes>()
  const key = [viewerID?.id, alias]

  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery<ContentType | null>(
    key,
    async (): Promise<ContentType | null> => (viewerID ? await viewerID.get(alias) : null)
  )

  const mutationOptions = {
    onSuccess: (content: ContentType) => {
      queryClient.setQueryData(key, content)
    },
  }

  const setMutation = useMutation(async (content: ContentType) => {
    if (viewerID == null || viewerID instanceof PublicID) {
      throw new Error('Cannot mutate record')
    }
    await viewerID.set(alias, content)
    return content
  }, mutationOptions)

  const mergeMutation = useMutation(async (content: ContentType) => {
    if (viewerID == null || viewerID instanceof PublicID) {
      throw new Error('Cannot mutate record')
    }
    const newContent = { ...(data ?? {}), ...content }
    await viewerID.set(alias, newContent)
    return newContent
  }, mutationOptions)

  if (viewerID == null) {
    return {
      isLoadable: false,
      isLoading: false,
      isError: false,
      isMutable: false,
      isMutating: false,
    }
  }
  if (viewerID instanceof PublicID) {
    return {
      content: data,
      isLoadable: true,
      isLoading,
      isError,
      error,
      isMutable: false,
      isMutating: false,
    }
  }
  return {
    content: data,
    isLoadable: true,
    isLoading,
    isError,
    error,
    isMutable: true,
    isMutating: setMutation.isLoading || mergeMutation.isLoading,
    set: async (content: ContentType) => {
      await setMutation.mutateAsync(content)
    },
    merge: async (content: ContentType) => {
      await mergeMutation.mutateAsync(content)
    },
  }
}

export type PublicRecord<ContentType> = {
  isLoading: boolean
  content?: ContentType
  isError: boolean
  error?: unknown
}

export function usePublicRecord<
  ModelTypes extends CoreModelTypes = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions'],
  ContentType = DefinitionContentType<ModelTypes, Alias>
>(alias: Alias, id: string): PublicRecord<ContentType | null> {
  const core = useCore<ModelTypes>()
  const { data, isLoading, isError, error } = useQuery<ContentType | null>(
    [id, alias],
    async () => (await core.get(alias, id)) as unknown as ContentType | null
  )
  return { content: data, isLoading, isError, error }
}
