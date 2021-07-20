export interface Deferred<T> extends Promise<T> {
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export function deferred<T>(): Deferred<T> {
  let methods
  const promise = new Promise<T>((resolve, reject): void => {
    methods = { resolve, reject }
  })
  return Object.assign(promise, methods) as Deferred<T>
}

export function formatDID(did: string): string {
  return did.length <= 20 ? did : `${did.slice(0, 10)}...${did.slice(-6)}`
}

const ethAddressRegex = /^0x[0-9a-f]{40}$/i
export function isEthereumAddress(address: string): boolean {
  return ethAddressRegex.test(address)
}

export function isSupportedDid(did: string): boolean {
  return did.startsWith('did:3') || did.startsWith('did:key')
}
