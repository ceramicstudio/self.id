import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import type { ReactNode } from 'react'

import { WEB3_REACT_KEY } from './constants'
import { useEthereumRootConnect, useEthereumRootEvents } from './hooks'

function getLibrary() {
  // No library to return
}

export type ProviderProps = { children?: ReactNode }

// Workaround for SSR issue, cf https://github.com/NoahZinsmeister/web3-react/issues/176
function NoopRoot({ children }: ProviderProps) {
  return <>{children}</>
}
const Web3ReactRoot = process.browser ? createWeb3ReactRoot(WEB3_REACT_KEY) : NoopRoot

function EthereumRoot({ children }: ProviderProps) {
  useEthereumRootConnect()
  useEthereumRootEvents()

  return <>{children}</>
}

export function Provider({ children }: ProviderProps) {
  return process.browser ? (
    <Web3ReactRoot getLibrary={getLibrary}>
      <EthereumRoot>{children}</EthereumRoot>
    </Web3ReactRoot>
  ) : (
    <Web3ReactProvider getLibrary={getLibrary}>
      <EthereumRoot>{children}</EthereumRoot>
    </Web3ReactProvider>
  )
}
