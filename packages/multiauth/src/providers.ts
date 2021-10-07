import { getConnectorsConfig } from './connectors'
import type {
  EthereumProvider,
  PartialProviderConfig,
  ProviderConfig,
  ProviderConfigDefaults,
  ProviderKey,
  ProviderState,
  ProviderStateParams,
} from './types'
import { toChainID } from './utils'

/** @internal */
export async function getEthereumAccount(provider: EthereumProvider): Promise<string | null> {
  try {
    const accounts = await provider.request<Array<string>>({ method: 'eth_requestAccounts' })
    return accounts[0] ?? null
  } catch (err) {
    return null
  }
}

/** @internal */
export async function getEthereumChainId(provider: EthereumProvider): Promise<string> {
  return await provider.request<string>({ method: 'eth_chainId' })
}

/** @internal */
export async function getEthereumProviderState(
  provider: EthereumProvider,
  params: ProviderStateParams = {}
): Promise<ProviderState<EthereumProvider>> {
  const [account, chainID] = await Promise.all([
    params.account ?? getEthereumAccount(provider),
    params.chainID ?? getEthereumChainId(provider),
  ])
  return { account, chainID: toChainID(chainID), provider }
}

/** @internal */
export const providersDefaults: Record<ProviderKey, ProviderConfigDefaults> = {
  ethereum: {
    label: 'Ethereum',
    logo: new URL('../assets/ethereum.png', import.meta.url).href,
    connectors: ['injected'],
    getState: getEthereumProviderState,
  },
}

/** @internal */
export function getDefaultProviderConfig<Key extends ProviderKey>(key: Key): ProviderConfig<Key> {
  const config = providersDefaults[key]
  if (config == null) {
    throw new Error(`No default config for provider: ${key}`)
  }

  const connectors = getConnectorsConfig(config.connectors, key)
  return { ...config, connectors, key }
}

export function getProviderConfig<Key extends ProviderKey>(
  provider: PartialProviderConfig<Key>
): ProviderConfig<Key> {
  if (typeof provider === 'string') {
    return getDefaultProviderConfig(provider)
  }

  const defaults = providersDefaults[provider.key]
  if (defaults == null) {
    throw new Error(`No default config for provider: ${provider.key}`)
  }

  const connectors = getConnectorsConfig(provider.connectors ?? defaults.connectors, provider.key)
  return { ...defaults, ...provider, connectors }
}

export function getProvidersConfig(providers: Array<PartialProviderConfig>): Array<ProviderConfig> {
  return providers.map(getProviderConfig)
}
