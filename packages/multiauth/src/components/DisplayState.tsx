import { Text } from 'grommet'
import React from 'react'
import type { ReactElement } from 'react'

import { useMultiAuth } from '../hooks'

export function DisplayState(): ReactElement {
  const state = useMultiAuth()[0]

  switch (state.status) {
    case 'authenticated':
      return <Text>Authenticated with account: {state.auth.accountID.toString()}</Text>
    case 'authenticating':
      return <Text>Authenticating...</Text>
    case 'idle':
      return <Text>Not authenticated</Text>
    case 'failed':
      return <Text>Failed to authenticate: {state.error?.message}</Text>
  }
}
