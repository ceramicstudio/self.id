import { useMultiAuth } from '@ceramicstudio/multiauth'
import { Button } from 'grommet'
import type { ReactNode } from 'react'

import { useEnvState, useLogin } from '../hooks'

const style = { color: 'white', width: 200 }

export type Props = {
  children: ReactNode
}

export default function ConnectedContainer({ children }: Props) {
  const [authState] = useMultiAuth()
  const { auth } = useEnvState()
  const [login, loginModal] = useLogin()

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
      {button}
      {loginModal}
    </>
  )
}
