# Authentication

```tsx live noInline
// import { useConnection } from '@self.id/framework'

function ConnectButton() {
  const [connection, connect, disconnect] = useConnection()

  return connection.status === 'connected' ? (
    <button
      onClick={() => {
        disconnect()
      }}>
      Disconnect ({connection.selfID.id})
    </button>
  ) : 'ethereum' in window ? (
    <button
      disabled={connection.status === 'connecting'}
      onClick={() => {
        connect()
      }}>
      Connect
    </button>
  ) : (
    <p>
      An injected Ethereum provider such as <a href="https://metamask.io/">MetaMask</a> is needed to
      authenticate.
    </p>
  )
}

render(<ConnectButton />)
```
