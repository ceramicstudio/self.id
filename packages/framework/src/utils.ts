import type {
  EIP1193Provider,
  RequestArguments,
  Web3Provider,
  Web3ProviderSendCallback,
} from '@self.id/multiauth'

export function wrapEIP1193asWeb3Provider(provider: EIP1193Provider): Web3Provider {
  async function enable(): Promise<Array<string>> {
    return await provider.request({ method: 'eth_requestAccounts' })
  }

  async function sendAsync<Result = unknown>(
    req: RequestArguments,
    cb: Web3ProviderSendCallback<Result>
  ): Promise<void> {
    try {
      const result = await provider.request<Result>(req)
      cb(undefined, { id: undefined, jsonrpc: '2.0', method: req.method, result })
    } catch (error) {
      cb(error as Error)
    }
  }

  return { enable, sendAsync }
}
