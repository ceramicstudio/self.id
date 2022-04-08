import type { DefinitionContentType } from '@glazed/did-datastore'
import type { ModelTypeAliases } from '@glazed/types'
import { PublicID } from '@self.id/core'
import type { CoreModelTypes } from '@self.id/core'
import type { EthereumAuthProvider, SelfID } from '@self.id/web'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import type { ReactClient } from './client.js'
import { stateScope, connectionAtom, clientAtom, viewerIDAtom } from './state.js'
import type { ViewerConnectionState } from './types.js'
import { abortable } from './utils.js'

export function useClient<
  ModelTypes extends ModelTypeAliases = CoreModelTypes
>(): ReactClient<ModelTypes> {
  return useAtomValue(clientAtom, stateScope) as unknown as ReactClient<ModelTypes>
}

/**
 * A ViewerID can be either a {@linkcode web.SelfID SelfID} or {@linkcode core.PublicID PublicID}
 * instance depending on the current {@linkcode ViewerConnectionState}.
 */
export type ViewerID<ModelTypes extends ModelTypeAliases> =
  | PublicID<ModelTypes>
  | SelfID<ModelTypes>

export function useViewerID<
  ModelTypes extends ModelTypeAliases = CoreModelTypes
>(): ViewerID<ModelTypes> | null {
  return useAtomValue(viewerIDAtom, stateScope) as unknown as ViewerID<ModelTypes> | null
}

/**
 * Hook for handling the viewer's connection lifecycle, returning the following elements:
 *
 * 1. The current {@linkcode ViewerConnectionState} object.
 * 2. A connection attempt function, taking an `EthereumAuthProvider` argument.
 * 3. A reset function, clearing the current {@linkcode ViewerID}.
 */
export function useViewerConnection<ModelTypes extends ModelTypeAliases = CoreModelTypes>(): [
  ViewerConnectionState<ModelTypes>,
  (provider: EthereumAuthProvider) => Promise<SelfID<ModelTypes> | null>,
  () => void
] {
  const client = useClient<ModelTypes>()
  const [connection, setConnection] = useAtom(connectionAtom, stateScope)
  const setViewerID = useSetAtom(viewerIDAtom, stateScope)

  const connect = useCallback(
    async (provider: EthereumAuthProvider): Promise<SelfID<ModelTypes> | null> => {
      if (connection.status === 'connecting' && connection.provider === provider) {
        return (await connection.promise) as SelfID<ModelTypes> | null
      }

      if (connection.status === 'connecting') {
        connection.promise.abort()
      }
      try {
        const promise = abortable(
          client.authenticate(provider).then((selfID) => {
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
    [client, connection, setConnection, setViewerID]
  )

  const reset = useCallback(() => {
    void setViewerID(null)
  }, [setViewerID])

  return [connection, connect, reset]
}

/**
 * A ViewerRecord provides an interface for interacting with record stored on Ceramic, depending on
 * the current {@linkcode ViewerID} value:
 *
 * - If `null`, no interaction is possible with the record.
 * - If it is an instance of {@linkcode core.PublicID PublicID}, only reads are possible.
 * - If it is an instance of {@linkcode web.SelfID SelfID}, all interactions (reads and mutations)
 * are possible.
 *
 * The ViewerRecord object contains the following properties:
 *
 * - `isLoadable`: `false` if the viewer ID is `null`, `true` otherwise.
 * - `isLoading`: `true` when the record is being loaded, `false` otherwise.
 * - `content`: the record contents, if loaded.
 * - `isError`: `true` when the record failed to load, `false` otherwise.
 * - `error`: possible error raised when attempting to load the record.
 * - `isMutable`: `true` if the viewer ID is an instance of {@linkcode web.SelfID SelfID},
 * `false` otherwise.
 * - `isMutating`: `true` when the record is being mutated as the result of calling the
 * ViewerRecord object `merge` or `set` function, `false` otherwise.
 * - `set`: function used to replace the record contents using the {@linkcode web.SelfID.set set}
 * method, only available if `isMutating` is `true`.
 * - `merge`: function used to merge the record contents using the
 * {@linkcode web.SelfID.merge merge} method, only available if `isMutating` is `true`.
 */
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
  | {
      // With viewerID -> loadable
      isLoadable: true
      isLoading: boolean
      content?: ContentType
      isError: boolean
      error?: unknown
      // Only mutable if SelfID
      isMutable: boolean
      isMutating: boolean
      set(content: ContentType): Promise<void>
      merge(content: ContentType): Promise<void>
    }

/**
 * Hook for accessing the {@linkcode ViewerRecord} for a given alias.
 */
export function useViewerRecord<
  ModelTypes extends ModelTypeAliases = CoreModelTypes,
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

  return viewerID == null
    ? { isLoadable: false, isLoading: false, isError: false, isMutable: false, isMutating: false }
    : {
        content: data,
        isLoadable: true,
        isLoading,
        isError,
        error,
        isMutable: !(viewerID instanceof PublicID),
        isMutating: setMutation.isLoading || mergeMutation.isLoading,
        set: async (content: ContentType) => {
          await setMutation.mutateAsync(content)
        },
        merge: async (content: ContentType) => {
          await mergeMutation.mutateAsync(content)
        },
      }
}

/**
 * A PublicRecord provides an interface for interacting with record stored on Ceramic, associated
 * to a given DID string.
 */
export type PublicRecord<ContentType> = {
  /** `true` when the record is being loaded, `false` otherwise. */
  isLoading: boolean
  /** Record contents, if loaded. */
  content?: ContentType
  /** `true` when the record failed to load, `false` otherwise. */
  isError: boolean
  /** Possible error raised when attempting to load the record. */
  error?: unknown
}

/**
 * Hook for accessing the {@linkcode PublicRecord} for a given alias and account (DID or CAIP-10).
 */
export function usePublicRecord<
  ModelTypes extends ModelTypeAliases = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions'],
  ContentType = DefinitionContentType<ModelTypes, Alias>
>(alias: Alias, id: string): PublicRecord<ContentType | null> {
  const client = useClient<ModelTypes>()
  const { data, isLoading, isError, error } = useQuery<ContentType | null>(
    [id, alias],
    async () => (await client.get(alias, id)) as unknown as ContentType | null
  )
  return { content: data, isLoading, isError, error }
}
