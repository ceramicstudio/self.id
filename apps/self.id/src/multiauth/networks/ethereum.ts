import { ChainId } from 'caip'
import type { ChainIdParams } from 'caip'

import type { EIP1193Provider, ProviderType, Web3Provider } from '../providers/types'
import { web3ProviderRequest } from '../providers/utils'
import type { NetworkProvider, NetworkState, NetworkStateParams } from '../types'

type NetworkStateData = {
  account: string | null
  chainID: ChainId
}

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
export function toChainID(id: ChainId | ChainIdParams | string | number): ChainId {
  if (id instanceof ChainId) {
    return id
  }

  const params =
    typeof id === 'object'
      ? id
      : {
          namespace: 'eip155',
          reference: typeof id === 'number' ? id.toString() : CHAIN_IDS[id] || id,
        }
  return new ChainId(params)
}

/** @internal */
export async function getEIP1193Account(provider: EIP1193Provider): Promise<string | null> {
  try {
    const accounts = await provider.request<Array<string>>({ method: 'eth_requestAccounts' })
    return accounts[0] ?? null
  } catch (err) {
    return null
  }
}

/** @internal */
export async function getWeb3Account(provider: Web3Provider): Promise<string | null> {
  try {
    const accounts = await provider.enable()
    return accounts[0] ?? null
  } catch (err) {
    return null
  }
}

/** @internal */
export async function getEIP1193ProviderState(
  provider: EIP1193Provider,
  params: NetworkStateParams = {}
): Promise<NetworkStateData> {
  const [account, chainID] = await Promise.all([
    params.account ?? getEIP1193Account(provider),
    params.chainID ?? provider.request<string>({ method: 'eth_chainId' }),
  ])
  return { account, chainID: toChainID(chainID) }
}

export async function getWeb3ProviderState(
  provider: Web3Provider,
  params: NetworkStateParams = {}
): Promise<NetworkStateData> {
  const [account, chainID] = await Promise.all([
    params.account ?? getWeb3Account(provider),
    params.chainID ?? web3ProviderRequest<string>(provider, { method: 'eth_chainId' }),
  ])
  return { account, chainID: toChainID(chainID) }
}

/** @internal */
export async function getEthereumProviderState<Key extends NetworkProvider<'ethereum'>>(
  providerKey: Key,
  provider: ProviderType<Key>,
  params: NetworkStateParams = {}
): Promise<NetworkState<Key>> {
  let data: NetworkStateData
  if (providerKey === 'eip1193') {
    data = await getEIP1193ProviderState(provider as EIP1193Provider, params)
  } else if (providerKey === 'web3') {
    data = await getWeb3ProviderState(provider as Web3Provider, params)
  } else {
    throw new Error(`Unsupported Ethereum provider: ${providerKey}`)
  }
  return { ...data, provider, providerKey }
}
