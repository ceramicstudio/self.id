import { RequestClient } from '@self.id/framework'
import { RequestState } from '@self.id/framework'
import type { GetServerSidePropsContext } from 'next'

import { CERAMIC_NETWORK } from './constants'
import model from './model.json'
import type { ModelTypes } from './types'

export function createRequestClient(ctx: GetServerSidePropsContext): RequestClient<ModelTypes> {
  return new RequestClient({
    ceramic: CERAMIC_NETWORK,
    cookie: ctx.req.headers.cookie,
    model,
  })
}

export async function getRequestState(
  ctx: GetServerSidePropsContext,
  did?: string
): Promise<RequestState> {
  const requestClient = createRequestClient(ctx)

  const prefetch = []
  if (did != null) {
    prefetch.push(requestClient.prefetch('notes', did))
  }
  if (requestClient.viewerID != null) {
    prefetch.push(requestClient.prefetch('basicProfile', requestClient.viewerID))
  }
  await Promise.all([prefetch])

  return requestClient.getState()
}
