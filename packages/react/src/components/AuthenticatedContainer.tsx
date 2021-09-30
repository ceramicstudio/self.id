import React from 'react'
import type { ReactNode } from 'react'

import { useAuthentication } from '../hooks'
import type { AuthenticationState } from '../types'

export type AuthenticatedContainerProps = {
  children: ReactNode
  renderFallback: (authState: AuthenticationState) => JSX.Element | null
}

export function AuthenticatedContainer({
  children,
  renderFallback,
}: AuthenticatedContainerProps): JSX.Element | null {
  const [authState] = useAuthentication()

  return authState.status === 'authenticated' ? (
    <>{children}</>
  ) : renderFallback ? (
    renderFallback(authState)
  ) : null
}
