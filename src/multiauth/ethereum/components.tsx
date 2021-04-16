import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import type { ReactNode } from 'react'

import { NAMESPACE } from '../constants'

import type { ProviderConfig } from './types'

function getLibrary() {
  // No library to return
}

// Workaround for SSR issue, cf https://github.com/NoahZinsmeister/web3-react/issues/176
const Web3ReactRoot = process.browser ? createWeb3ReactRoot(NAMESPACE) : Web3ReactProvider

export type ProviderProps = { children: ReactNode; config: ProviderConfig }

export function EthereumProvider({ children }: ProviderProps) {
  return <Web3ReactRoot getLibrary={getLibrary}>{children}</Web3ReactRoot>
}
