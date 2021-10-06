import { Button } from 'grommet'
import type { ButtonExtendedProps } from 'grommet'
import React, { useCallback } from 'react'
import type { ReactElement } from 'react'

import { useMultiAuth } from '../hooks'

export type ConnectButtonProps = Omit<ButtonExtendedProps, 'disabled' | 'onClick'>

export function ConnectButton(props: ConnectButtonProps): ReactElement {
  const [state, connect] = useMultiAuth()

  const onClick = useCallback(() => {
    connect({ mode: 'select' }).catch((err) => {
      console.warn('Failed to connect:', (err as Error).message)
    })
  }, [connect])

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Button
      label="Connect"
      {...props}
      disabled={state.status === 'authenticating'}
      onClick={onClick}
    />
  )
}
