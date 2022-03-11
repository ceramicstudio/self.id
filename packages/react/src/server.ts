import type { CeramicClient } from '@ceramicnetwork/http-client'
import type { DIDDataStore } from '@glazed/did-datastore'
import type { ModelTypeAliases } from '@glazed/types'
import { Core } from '@self.id/core'
import type { CoreModelTypes, CoreParams } from '@self.id/core'
import { dehydrate, QueryClient } from 'react-query'

import { VIEWER_ID_STORAGE_KEY } from './constants.js'
import type { RequestState } from './types.js'
import { getCookieValue } from './utils.js'

/** Extract the possible viewer ID value from the given cookie string value. */
export function getCookieViewerID(cookie?: string): string | null {
  return (cookie && getCookieValue(cookie, VIEWER_ID_STORAGE_KEY)) || null
}

export type RequestClientParams<ModelTypes extends ModelTypeAliases = CoreModelTypes> =
  CoreParams<ModelTypes> & {
    /** Request cookie string to parse in order to extract the viewer ID. */
    cookie?: string
  }

/**
 * The RequestClient extends the {@linkcode core.Core Core} class as a server-side client for
 * prefetching and serializing records so they can be hydrated on the browser side.
 *
 * It is exported by the {@linkcode react} module.
 *
 * ```sh
 * import { RequestClient } from '@self.id/react'
 * ```
 */
export class RequestClient<
  ModelTypes extends ModelTypeAliases = CoreModelTypes,
  Alias extends keyof ModelTypes['definitions'] = keyof ModelTypes['definitions']
> extends Core<ModelTypes> {
  // Internal properties from parent class need to be copied over here an marked as internal
  // to prevent from being displayed in docs
  /** @internal */
  // @ts-ignore initialization in parent class
  _ceramic: CeramicClient
  /** @internal */
  // @ts-ignore initialization in parent class
  _dataStore: DIDDataStore<ModelTypes>
  // Make internal QueryClient instance writable for tests
  /** @internal */
  _queryClient: QueryClient
  #viewerID: string | null

  constructor(params: RequestClientParams<ModelTypes>) {
    super(params)
    this._queryClient = new QueryClient()
    this.#viewerID = getCookieViewerID(params.cookie)
  }

  /** Viewer ID associated to the request, if found in cookie string. */
  get viewerID(): string | null {
    return this.#viewerID
  }

  /** Prefetch loading a record so it can be exported using {@linkcode getState}. */
  async prefetch<Key extends Alias>(key: Key, id = this.#viewerID): Promise<boolean> {
    if (id == null) {
      return false
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    await this._queryClient.prefetchQuery([id, key], async () => await this.get(key, id))
    return true
  }

  /**
   * Return a serialized request state possibly containing the current viewer ID and prefetched
   * records so they can be injected on the browser side, notably in the {@linkcode Provider}.
   */
  getState(): RequestState {
    return {
      hydrate: dehydrate(this._queryClient),
      viewerID: this.#viewerID,
    }
  }
}
