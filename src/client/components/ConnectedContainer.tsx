import { Button } from 'grommet'
import type { ReactNode } from 'react'

import { useEthereum, useIDXAuth, useLogin } from '../hooks'

const style = { color: 'white', width: 200 }

export type Props = {
  children: ReactNode
}

export default function ConnectedContainer({ children }: Props) {
  const [ethState] = useEthereum()
  const [auth] = useIDXAuth()
  const [login, loginModal] = useLogin()

  if (auth.state === 'CONFIRMED') {
    return <>{children}</>
  }

  const button =
    auth.state === 'LOADING' || ethState.status === 'CONNECTING' ? (
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
