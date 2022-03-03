import type { PartialConnectorConfig, PartialNetworkConfig } from './multiauth/types'

const ethereumConnectors: Array<PartialConnectorConfig> = [{ key: 'injected' }]

const walletConnectChainId = process.env.NEXT_PUBLIC_WALLETCONNECT_CHAIN_ID
const walletConnectRpcUrl = process.env.NEXT_PUBLIC_WALLETCONNECT_RPC_URL
if (typeof walletConnectChainId === 'string' && typeof walletConnectRpcUrl === 'string') {
  ethereumConnectors.push({
    key: 'walletConnect',
    params: {
      rpc: { [walletConnectChainId]: walletConnectRpcUrl },
    },
  })
}

const fortmaticApiKey = process.env.NEXT_PUBLIC_FORTMATIC_API_KEY
const fortmaticChainId = process.env.NEXT_PUBLIC_FORTMATIC_CHAIN_ID
if (typeof fortmaticApiKey === 'string' && typeof fortmaticChainId === 'string') {
  ethereumConnectors.push({
    key: 'fortmatic',
    params: {
      apiKey: fortmaticApiKey,
    },
  })
}

const portisDappId = process.env.NEXT_PUBLIC_PORTIS_DAPP_ID
const portisNetwork = process.env.NEXT_PUBLIC_PORTIS_NETWORK
if (typeof portisDappId === 'string' && typeof portisNetwork === 'string') {
  ethereumConnectors.push({
    key: 'portis',
    params: {
      dAppId: portisDappId,
      network: portisNetwork,
    },
  })
}

const torusNetworkHost = process.env.NEXT_PUBLIC_TORUS_NETWORK_HOST
if (typeof torusNetworkHost === 'string') {
  ethereumConnectors.push({
    key: 'torus',
    params: {
      network: { host: torusNetworkHost },
    },
  })
}

export const networks: Array<PartialNetworkConfig> = [
  {
    key: 'ethereum',
    connectors: ethereumConnectors,
  },
]
