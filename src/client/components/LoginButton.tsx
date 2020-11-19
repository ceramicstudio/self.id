import { Button } from 'grommet'

import { useEthereum, useIDXAuth, useLogin } from '../hooks'

export default function LoginButton() {
  const [ethState] = useEthereum()
  const [auth] = useIDXAuth()
  const [login, loginModal] = useLogin()

  if (auth.state === 'CONFIRMED') {
    return null
  }

  const button =
    auth.state === 'LOADING' || ethState.status === 'CONNECTING' ? (
      <Button disabled label="Logging in..." primary style={{ color: 'white', width: 200 }} />
    ) : (
      <Button
        onClick={() => void login()}
        label="Login"
        primary
        style={{ color: 'white', width: 200 }}
      />
    )

  return (
    <>
      {button}
      {loginModal}
    </>
  )
}
