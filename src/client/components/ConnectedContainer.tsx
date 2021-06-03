import { useMultiAuth } from '@ceramicstudio/multiauth'
import { Button, Text } from 'grommet'
import type { ReactNode } from 'react'

import { useEnvState, useLogin } from '../hooks'

const style = { color: 'white', marginTop: 10, width: 200 }

export type Props = {
  children: ReactNode
}

export default function ConnectedContainer({ children }: Props) {
  const [authState] = useMultiAuth()
  const { auth } = useEnvState()
  const login = useLogin()

  if (auth.state === 'confirmed') {
    return <>{children}</>
  }

  const button =
    auth.state === 'loading' || authState.status === 'connecting' ? (
      <Button disabled label="Connecting..." primary style={style} />
    ) : (
      <Button label="Connect" onClick={() => void login()} primary style={style} />
    )

  return (
    <>
      <Text weight="bold">Please connect your DID to access the data needed by this page.</Text>
      {button}
    </>
  )
}
