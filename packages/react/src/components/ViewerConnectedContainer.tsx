import React from 'react'
import type { ReactNode } from 'react'

import { useViewerConnection } from '../hooks.js'
import type { ViewerConnectionState } from '../types.js'

export type ViewerConnectedContainerProps = {
  children: ReactNode
  renderFallback?: (connectionState: ViewerConnectionState) => JSX.Element | null
}

export function ViewerConnectedContainer(props: ViewerConnectedContainerProps): JSX.Element | null {
  const [connection] = useViewerConnection()

  return connection.status === 'connected' ? (
    <>{props.children}</>
  ) : props.renderFallback ? (
    props.renderFallback(connection)
  ) : null
}
