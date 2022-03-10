export type RequestArguments = {
  method: string
  params?: Array<unknown> | Record<string, any>
}

export type JSONRPCResponse<Result = unknown> = {
  id: string | undefined
  jsonrpc: '2.0'
  method: string
  result?: Result
  error?: Error
}

export type EIP1193Provider = {
  request<Result = unknown>(req: RequestArguments): Promise<Result>
}

export type Web3ProviderSendCallback<Result = unknown> = (
  err?: Error,
  response?: JSONRPCResponse<Result>
) => void

export type Web3Provider = {
  enable(): Promise<Array<string>>
  sendAsync<Result = unknown>(
    req: RequestArguments,
    callback: Web3ProviderSendCallback<Result>
  ): void
}

export type ProviderTypes = {
  eip1193: EIP1193Provider
  web3: Web3Provider
}

export type ProviderKey = keyof ProviderTypes

export type ProviderType<Key extends ProviderKey> = ProviderTypes[Key]
