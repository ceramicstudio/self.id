import { EthereumAuthProvider, useViewerConnection } from '@self.id/framework'
import { Anchor, Button, Paragraph } from 'grommet'
import React, { useCallback } from 'react'

export default function ConnectButton() {
  const [connection, connect, disconnect] = useViewerConnection()

  const onClickConnect = useCallback(async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
  }, [connect])

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
      onClick={onClickConnect}
    />
  ) : (
    <Paragraph>
      An injected Ethereum provider such as <Anchor href="https://metamask.io/">MetaMask</Anchor> is
      needed to authenticate.
    </Paragraph>
  )
}
