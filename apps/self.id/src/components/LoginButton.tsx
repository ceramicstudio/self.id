import { useConnection } from '@self.id/framework'
import { Button } from 'grommet'

import { useLogin } from '../hooks'

const style = { color: 'white', width: 200 }

export default function LoginButton() {
  const [connection] = useConnection()
  const login = useLogin()

  if (connection.status === 'connected') {
    return null
  }

  return connection.status === 'connecting' ? (
    <Button disabled label="Connecting..." primary style={style} />
  ) : (
    <Button label="Connect" onClick={() => void login()} primary style={style} />
  )
}
