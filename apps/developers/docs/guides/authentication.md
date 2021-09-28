# Authentication

```tsx live noInline
// import { createEthereumAuthProvider, useAuthentication } from '@self.id/framework'

function ConnectButton() {
  const [authState, authenticate, reset] = useAuthentication()

  return authState.status === 'authenticated' ? (
    <button
      onClick={() => {
        reset()
      }}>
      Disconnect ({authState.selfID.id})
    </button>
  ) : (
    <button
      disabled={authState.status === 'authenticating'}
      onClick={() => {
        createEthereumAuthProvider(window.ethereum).then(authenticate)
      }}>
      Connect
    </button>
  )
}

render(<ConnectButton />)
```
