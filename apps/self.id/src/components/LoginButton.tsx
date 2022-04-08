import { Button } from 'grommet'

import { useAuthConnection } from '../hooks'

const style = { color: 'white', width: 200 }

export default function LoginButton() {
  const [connection, login] = useAuthConnection()

  if (connection.status === 'connected') {
    return null
  }

  return connection.status === 'connecting' ? (
    <Button disabled label="Connecting..." primary style={style} />
  ) : (
    <Button label="Connect" onClick={() => void login()} primary style={style} />
  )
}
