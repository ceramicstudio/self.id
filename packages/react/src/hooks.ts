import type { DefinitionContentType } from '@glazed/did-datastore'
import { PublicID } from '@self.id/core'
import type { Core, CoreModelTypes } from '@self.id/core'
import type { AuthenticateParams, EthereumAuthProvider, SelfID } from '@self.id/web'
import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { stateScope, authenticationAtom, clientConfigAtom, coreAtom, viewerIDAtom } from './state'
import type { AuthenticationState } from './types'
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

export function useAuthentication(): [
  AuthenticationState,
  (provider: EthereumAuthProvider) => Promise<SelfID | null>,
  () => void
] {
  const config = useAtomValue(clientConfigAtom, stateScope)
  const [auth, setAuth] = useAtom(authenticationAtom, stateScope)
  const setViewerID = useUpdateAtom(viewerIDAtom, stateScope)

  const authenticate = useCallback(
    async (provider: EthereumAuthProvider): Promise<SelfID | null> => {
      if (auth.status === 'authenticating' && auth.provider === provider) {
        return await auth.promise
      }

      if (auth.status === 'authenticating') {
        auth.promise.abort()
      }
      try {
        const promise = abortable(
          authenticateSelfID({ ...config, authProvider: provider }).then((selfID) => {
            if (promise.signal.aborted) {
              void setAuth({ status: 'pending' })
              return null
            }
            void setViewerID(selfID)
            return selfID
          })
        )
        void setAuth({ status: 'authenticating', provider, promise })
        return await promise
      } catch (err) {
        void setAuth({ status: 'error', error: err as Error })
        return null
      }
    },
    [auth, setAuth, setViewerID]
  )

  const reset = useCallback(() => {
    void setViewerID(null)
  }, [setViewerID])

  return [auth, authenticate, reset]
}

export type ViewerRecord<ContentType> =
  | {
      isLoadable: false
      isLoading: false
      content?: never
      isError: false
      error?: never
      isMutable: false
      isMutating: false
      set?: never
    } // No viewerID
  | ({
      isLoadable: true
      isLoading: boolean
      content?: ContentType
      isError: boolean
      error?: unknown
    } & (
      | { isMutable: false; isMutating: false } // Read-only (PublicID)
      | { isMutable: true; isMutating: boolean; set(content: ContentType): Promise<void> } // Read/write (SelfID)
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
  const mutation = useMutation(
    async (content: ContentType) => {
      if (viewerID == null || viewerID instanceof PublicID) {
        throw new Error('Cannot mutate record')
      }
      await viewerID.set(alias, content)
      return content
    },
    {
      onSuccess: (content) => {
        queryClient.setQueryData(key, content)
      },
    }
  )

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
    isMutating: mutation.isLoading,
    set: async (content: ContentType) => {
      await mutation.mutateAsync(content)
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
