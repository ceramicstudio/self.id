import React from 'react'
import type { ReactNode } from 'react'

import { useConnection } from '../hooks.js'
import type { ConnectionState } from '../types.js'

export type ConnectedContainerProps = {
  children: ReactNode
  renderFallback?: (connectionState: ConnectionState) => JSX.Element | null
}

export function ConnectedContainer(props: ConnectedContainerProps): JSX.Element | null {
  const [connection] = useConnection()

  return connection.status === 'connected' ? (
    <>{props.children}</>
  ) : props.renderFallback ? (
    props.renderFallback(connection)
  ) : null
}
