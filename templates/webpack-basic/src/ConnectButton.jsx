import { useConnection } from '@self.id/framework'
import { Anchor, Button, Paragraph } from 'grommet'
import React from 'react'

export default function ConnectButton() {
  const [connection, connect, disconnect] = useConnection()

  return connection.status === 'connected' ? (
    <Button
      label={`Disconnect (${connection.selfID.id})`}
      onClick={() => {
        disconnect()
      }}
    />
  ) : 'ethereum' in window ? (
    <Button
      disabled={connection.status === 'connecting'}
      label="Connect"
      onClick={() => {
        connect()
      }}
    />
  ) : (
    <Paragraph>
      An injected Ethereum provider such as <Anchor href="https://metamask.io/">MetaMask</Anchor> is
      needed to authenticate.
    </Paragraph>
  )
}
