import React from 'react'
import type { ReactNode } from 'react'

import { useViewerConnection } from '../hooks'
import type { ViewerConnectionState } from '../types'

export type ViewerConnectedContainerProps = {
  children: ReactNode
  renderFallback: (connectionState: ViewerConnectionState) => JSX.Element | null
}

export function ViewerConnectedContainer({
  children,
  renderFallback,
}: ViewerConnectedContainerProps): JSX.Element | null {
  const [connection] = useViewerConnection()

  return connection.status === 'connected' ? (
    <>{children}</>
  ) : renderFallback ? (
    renderFallback(connection)
  ) : null
}
