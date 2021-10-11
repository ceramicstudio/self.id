import ethereumLogo from '@self.id/multiauth/assets/ethereum.png'
import fortmaticLogo from '@self.id/multiauth/assets/fortmatic.png'
import metamaskLogo from '@self.id/multiauth/assets/metamask.png'
import portisLogo from '@self.id/multiauth/assets/portis.png'
import torusLogo from '@self.id/multiauth/assets/torus.png'
import walletConnectLogo from '@self.id/multiauth/assets/walletconnect.png'
import type { PartialConnectorConfig, PartialProviderConfig } from '@self.id/multiauth'

const ethereumConnectors: Array<PartialConnectorConfig> = [
  { key: 'injected', logo: metamaskLogo.src },
  { key: 'torus', logo: torusLogo.src },
]

const walletConnectChainId = process.env.NEXT_PUBLIC_WALLETCONNECT_CHAIN_ID
const walletConnectRpcUrl = process.env.NEXT_PUBLIC_WALLETCONNECT_RPC_URL
if (typeof walletConnectChainId === 'string' && typeof walletConnectRpcUrl === 'string') {
  ethereumConnectors.push({
    key: 'walletConnect',
    logo: walletConnectLogo.src,
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
    logo: fortmaticLogo.src,
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
    logo: portisLogo.src,
    params: {
      dAppId: portisDappId,
      network: portisNetwork,
    },
  })
}

export const providers: Array<PartialProviderConfig> = [
  {
    key: 'ethereum',
    logo: ethereumLogo.src,
    connectors: ethereumConnectors,
  },
]
