import { selectImageSource } from '@self.id/framework'
import type { Dimensions, ImageSources } from '@self.id/framework'

import { IPFS_URL } from './constants'

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

export function isSupportedDID(did: string): boolean {
  return did.startsWith('did:3') || did.startsWith('did:key')
}

export function getImageURL(
  sources: ImageSources | undefined,
  dimensions: Dimensions
): string | undefined {
  if (sources == null) {
    return
  }
  const image = selectImageSource(sources, dimensions)
  return image.src.replace('ipfs://', IPFS_URL)
}
