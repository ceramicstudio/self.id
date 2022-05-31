import { RequestClient } from '@self.id/framework'
import { RequestState } from '@self.id/framework'
import type { GetServerSidePropsContext } from 'next'

import { aliases } from './__generated__/aliases'
import { CERAMIC_NETWORK } from './constants'
import type { ModelTypes } from './types'

export function createRequestClient(ctx: GetServerSidePropsContext): RequestClient<ModelTypes> {
  return new RequestClient({ aliases, ceramic: CERAMIC_NETWORK, cookie: ctx.req.headers.cookie })
}

export async function getRequestState(
  ctx: GetServerSidePropsContext,
  did?: string
): Promise<RequestState> {
  const requestClient = createRequestClient(ctx)

  const prefetch = []
  if (did != null) {
    prefetch.push(requestClient.prefetch('basicProfile', did))
    prefetch.push(requestClient.prefetch('notes', did))
  }
  if (requestClient.viewerID != null && requestClient.viewerID !== did) {
    prefetch.push(requestClient.prefetch('basicProfile', requestClient.viewerID))
  }
  await Promise.all([prefetch])

  return requestClient.getState()
}
