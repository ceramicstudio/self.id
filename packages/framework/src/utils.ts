import type { Dimensions, ImageSources } from '@self.id/image-utils'
import { selectImageSource } from '@self.id/image-utils'
import type {
  EIP1193Provider,
  RequestArguments,
  Web3Provider,
  Web3ProviderSendCallback,
} from '@self.id/multiauth'

export function formatDID(did: string, maxLength = 20): string {
  if (maxLength < 12) {
    maxLength = 12
  }
  const half = Math.floor(maxLength / 2)
  const remaining = half - 3 - maxLength
  return did.length <= maxLength ? did : `${did.slice(0, half)}...${did.slice(remaining)}`
}

export function getImageURL(
  ipfsPrefix: string,
  sources: ImageSources | undefined,
  dimensions: Dimensions
): string | undefined {
  if (sources == null) {
    return
  }
  const image = selectImageSource(sources, dimensions)
  return image.src.replace('ipfs://', ipfsPrefix)
}

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
