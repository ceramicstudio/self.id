import { Core } from '@self.id/core'
import type { CoreModelTypes, CoreParams } from '@self.id/core'
import type { IncomingMessage } from 'node:http'
import { dehydrate, QueryClient } from 'react-query'
import type { DehydratedState } from 'react-query'

import { VIEWER_ID_STORAGE_KEY } from './constants'
import { getCookieValue } from './utils'

export class RequestClient<
  ModelTypes extends CoreModelTypes = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions']
> extends Core<ModelTypes> {
  #queryClient: QueryClient

  constructor(params: CoreParams<ModelTypes>) {
    super(params)
    this.#queryClient = new QueryClient()
  }

  async prefetch<Key extends Alias>(key: Key, id: string): Promise<void> {
    await this.#queryClient.prefetchQuery([id, key], async () => await this.get(key, id))
  }

  getState(): DehydratedState {
    return dehydrate(this.#queryClient)
  }
}

/** @internal */
export function getRequestCookie(
  req: IncomingMessage,
  name: string,
  fallback?: string
): string | undefined {
  return req.headers.cookie ? getCookieValue(req.headers.cookie, name, fallback) : fallback
}

export function getRequestViewerID(req: IncomingMessage): string | null {
  return getRequestCookie(req, VIEWER_ID_STORAGE_KEY) ?? null
}
