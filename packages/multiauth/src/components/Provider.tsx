import { Provider as JotaiProvider } from 'jotai'
import React, { useState } from 'react'
import type { ReactElement, ReactNode } from 'react'

import { getNetworksConfig } from '../networks.js'
import { stateScope } from '../state.js'
import type { PartialNetworkConfig } from '../types.js'

import { Modal } from './Modal.js'
import type { ModalConfig } from './Modal.js'

export type ProviderConfig = {
  modal?: ModalConfig
  networks?: Array<PartialNetworkConfig>
}

export type ProviderProps = ProviderConfig & {
  children: ReactNode
}

export function Provider(props: ProviderProps): ReactElement {
  const [networksConfig] = useState(() => getNetworksConfig(props.networks ?? ['ethereum']))

  return (
    <JotaiProvider scope={stateScope}>
      {props.children}
      <Modal {...(props.modal ?? {})} networks={networksConfig} />
    </JotaiProvider>
  )
}
