import { useMultiAuth } from '@ceramicstudio/multiauth'
import { useAuthentication } from '@self.id/framework'
import { Button } from 'grommet'

import { useLogin } from '../hooks'

const style = { color: 'white', width: 200 }

export default function LoginButton() {
  const [didAuthState] = useAuthentication()
  const [walletAuthState] = useMultiAuth()
  const login = useLogin()

  if (didAuthState.status === 'authenticated') {
    return null
  }

  return didAuthState.status === 'authenticating' || walletAuthState.status === 'connecting' ? (
    <Button disabled label="Connecting..." primary style={style} />
  ) : (
    <Button label="Connect" onClick={() => void login()} primary style={style} />
  )
}
