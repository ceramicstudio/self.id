import { ChainID } from 'caip'
import type { ChainIDParams } from 'caip'

/** @internal */
const CHAIN_IDS: Record<string, string> = {
  // Mainnet
  '0x01': '1',
  '0x1': '1',
  // Ropsten
  '0x03': '3',
  '0x3': '3',
  // Rinkeby
  '0x04': '4',
  '0x4': '4',
  // Goerli
  '0x05': '5',
  '0x5': '5',
  // Kovan
  '0x2a': '42',
}

/** @internal */
export function toChainID(id: ChainID | ChainIDParams | string | number): ChainID {
  if (id instanceof ChainID) {
    return id
  }

  const params =
    typeof id === 'object'
      ? id
      : {
          namespace: 'eip155',
          reference: typeof id === 'number' ? id.toString() : CHAIN_IDS[id] || id,
        }
  return new ChainID(params)
}

/** @internal */
export type Deferred<T> = Promise<T> & {
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

/** @internal */
export function deferred<T>(): Deferred<T> {
  let methods
  const promise = new Promise<T>((resolve, reject): void => {
    methods = { resolve, reject }
  })
  return Object.assign(promise, methods) as Deferred<T>
}
