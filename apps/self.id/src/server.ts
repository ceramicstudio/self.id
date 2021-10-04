import { Core, RequestClient } from '@self.id/framework'
import { RequestState } from '@self.id/framework'
import type { GetServerSidePropsContext } from 'next'

import { CERAMIC_URL } from './constants'

export const core = new Core({ ceramic: CERAMIC_URL })

export function createRequestClient(ctx: GetServerSidePropsContext): RequestClient {
  return new RequestClient({ ceramic: CERAMIC_URL, cookie: ctx.req.headers.cookie })
}

export async function getRequestState(ctx: GetServerSidePropsContext): Promise<RequestState> {
  const requestClient = createRequestClient(ctx)
  if (requestClient.viewerID != null) {
    await requestClient.prefetch('basicProfile', requestClient.viewerID)
  }
  return requestClient.getState()
}
