import { useMultiAuth } from '@ceramicstudio/multiauth'
import { Button } from 'grommet'

import { useEnvState, useLogin } from '../hooks'

const style = { color: 'white', width: 200 }

export default function LoginButton() {
  const [authState] = useMultiAuth()
  const { auth } = useEnvState()
  const login = useLogin()

  if (auth.state === 'confirmed') {
    return null
  }

  return auth.state === 'loading' || authState.status === 'connecting' ? (
    <Button disabled label="Connecting..." primary style={style} />
  ) : (
    <Button label="Connect" onClick={() => void login()} primary style={style} />
  )
}
