import { ConnectedContainer as BaseContainer } from '@self.id/framework'
import type { ConnectionState } from '@self.id/framework'
import { Button, Text } from 'grommet'
import type { ReactNode } from 'react'

import { useLogin } from '../hooks'

const style = { color: 'white', marginTop: 10, width: 200 }

type ConnectPromptProps = {
  connection: ConnectionState
}

function ConnectPrompt({ connection }: ConnectPromptProps): JSX.Element {
  const login = useLogin()

  const button =
    connection.status === 'connecting' ? (
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

export type Props = {
  children: ReactNode
}

export default function ConnectedContainer({ children }: Props): JSX.Element {
  return (
    <BaseContainer renderFallback={(connection) => <ConnectPrompt connection={connection} />}>
      {children}
    </BaseContainer>
  )
}
