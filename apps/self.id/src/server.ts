import { Core } from '@self.id/core'
import { RequestClient, getRequestViewerID } from '@self.id/framework'
import { RequestState } from '@self.id/framework'
import type { GetServerSidePropsContext } from 'next'

import { CERAMIC_URL } from './constants'

export const core = new Core({ ceramic: CERAMIC_URL })

export function createRequestClient(): RequestClient {
  return new RequestClient({ ceramic: CERAMIC_URL })
}

export function getViewerID(ctx: GetServerSidePropsContext): string | null {
  return getRequestViewerID(ctx.req)
}

export async function getRequestState(ctx: GetServerSidePropsContext): Promise<RequestState> {
  const requestClient = createRequestClient()
  const viewerID = getViewerID(ctx)
  if (viewerID != null) {
    await requestClient.prefetch('basicProfile', viewerID)
  }
  return { viewerID, hydrate: requestClient.getState() }
}
