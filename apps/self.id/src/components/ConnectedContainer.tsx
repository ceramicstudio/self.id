import { useMultiAuth } from '@ceramicstudio/multiauth'
import { useAuthentication } from '@self.id/framework'
import { Button, Text } from 'grommet'
import type { ReactNode } from 'react'

import { useLogin } from '../hooks'

const style = { color: 'white', marginTop: 10, width: 200 }

export type Props = {
  children: ReactNode
}

export default function ConnectedContainer({ children }: Props) {
  const [didAuthState] = useAuthentication()
  const [walletAuthState] = useMultiAuth()
  const login = useLogin()

  if (didAuthState.status === 'authenticated') {
    return <>{children}</>
  }

  const button =
    didAuthState.status === 'authenticating' || walletAuthState.status === 'connecting' ? (
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
