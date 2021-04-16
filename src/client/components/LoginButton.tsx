import { Button } from 'grommet'

import { useMultiAuth } from '../../multiauth'

import { useIDXAuth, useLogin } from '../hooks'

const style = { color: 'white', width: 200 }

export default function LoginButton() {
  const [authState] = useMultiAuth()
  const [auth] = useIDXAuth()
  const [login, loginModal] = useLogin()

  if (auth.state === 'CONFIRMED') {
    return null
  }

  const button =
    auth.state === 'LOADING' || authState.status === 'CONNECTING' ? (
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
