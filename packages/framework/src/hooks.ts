import type { DefinitionContentType } from '@glazed/did-datastore'
import { PublicID } from '@self.id/core'
import type { Core, CoreModelTypes } from '@self.id/core'
import type { EthereumAuthProvider, SelfID } from '@self.id/web'
import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { scope, authenticationAtom, clientConfigAtom, coreAtom, viewerIDAtom } from './state'
import type { AuthenticationState } from './types'
import { cancellable } from './utils'
import { authenticateSelfID } from './web/client'

export function useCore<ModelTypes extends CoreModelTypes = CoreModelTypes>(): Core<ModelTypes> {
  return useAtomValue(coreAtom, scope)
}

export type ViewerID<ModelTypes extends CoreModelTypes> = PublicID<ModelTypes> | SelfID<ModelTypes>

export function useViewerID<
  ModelTypes extends CoreModelTypes = CoreModelTypes
>(): ViewerID<ModelTypes> | null {
  return useAtomValue(viewerIDAtom, scope)
}

export function useAuthentication(): [
  AuthenticationState,
  (provider: EthereumAuthProvider) => Promise<SelfID | null>
] {
  const config = useAtomValue(clientConfigAtom, scope)
  const [auth, setAuth] = useAtom(authenticationAtom, scope)
  const setViewerID = useUpdateAtom(viewerIDAtom, scope)

  const authenticate = useCallback(
    async (provider: EthereumAuthProvider): Promise<SelfID | null> => {
      if (auth.status === 'authenticating' && auth.provider === provider) {
        return await auth.promise
      }

      if (auth.status === 'authenticating') {
        auth.promise.cancel()
      }
      try {
        const promise = cancellable(
          authenticateSelfID({ ...config, authProvider: provider }).then((selfID) => {
            if (promise.cancelled) {
              setAuth({ status: 'pending' })
              return null
            }
            setViewerID(selfID)
            return selfID
          })
        )
        setAuth({ status: 'authenticating', provider, promise })
        return await promise
      } catch (err) {
        setAuth({ status: 'error', error: err as Error })
        return null
      }
    },
    [auth, setAuth, setViewerID]
  )

  return [auth, authenticate]
}

export type ViewerRecord<Value> =
  | { isLoadable: false } // No viewerID
  | ({ isLoadable: true; isLoading: boolean; value?: Value } & (
      | { isMutable: false } // Read-only (PublicID)
      | { isMutable: true; isMutating: boolean; set(value: Value): Promise<void> } // Read/write (SelfID)
    ))

export function useViewerRecord<
  ModelTypes extends CoreModelTypes = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions'],
  Value = DefinitionContentType<ModelTypes, Alias>
>(alias: Alias): ViewerRecord<Value | null> {
  const viewerID = useViewerID<ModelTypes>()
  const key = [viewerID?.id, alias]

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery<Value | null>(
    key,
    async (): Promise<Value | null> => (viewerID ? await viewerID.get(alias) : null)
  )
  const mutation = useMutation(
    async (value: Value) => {
      if (viewerID == null || viewerID instanceof PublicID) {
        throw new Error('Cannot mutate record')
      }
      await viewerID.set(alias, value)
    },
    {
      onMutate: async (value: Value) => {
        await queryClient.cancelQueries(key)
        const previousValue = queryClient.getQueryData<Value | null>(key)
        queryClient.setQueryData(key, value)
        return { previousValue }
      },
      onError: (_err, _variables, context) => {
        queryClient.setQueryData<Value | null>(key, context?.previousValue ?? null)
      },
    }
  )

  if (viewerID == null) {
    return { isLoadable: false }
  }
  if (viewerID instanceof PublicID) {
    return { isLoadable: true, isLoading, value: data, isMutable: false }
  }
  return {
    isLoadable: true,
    isLoading,
    value: data,
    isMutable: true,
    isMutating: mutation.isLoading,
    set: async (value: Value) => {
      await mutation.mutateAsync(value)
    },
  }
}
