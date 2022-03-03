import { Provider as JotaiProvider } from 'jotai'
import React, { useState } from 'react'
import type { ReactElement, ReactNode } from 'react'

import { getNetworksConfig } from '../networks'
import { stateScope } from '../state'
import type { PartialNetworkConfig } from '../types'

import { Modal } from './Modal'
import type { ModalConfig } from './Modal'

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
