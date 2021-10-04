# Authentication

```tsx live noInline
// import { EthereumAuthProvider, useAuthentication } from '@self.id/framework'

function ConnectButton() {
  const [authState, authenticate, reset] = useAuthentication()

  const onClick = useCallback(async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new EthereumAuthProvider(window.ethereum, accounts[0])
    await authenticate(provider)
  }, [authenticate])

  return authState.status === 'authenticated' ? (
    <button
      onClick={() => {
        reset()
      }}>
      Disconnect ({authState.selfID.id})
    </button>
  ) : 'ethereum' in window ? (
    <button disabled={authState.status === 'authenticating'} onClick={onClick}>
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
