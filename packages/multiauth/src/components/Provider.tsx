import { Provider as JotaiProvider } from 'jotai'
import React, { useState } from 'react'
import type { ReactElement, ReactNode } from 'react'

import { getProvidersConfig } from '../providers'
import { stateScope } from '../state'
import type { PartialProviderConfig } from '../types'

import { Modal } from './Modal'
import type { ModalOptions } from './Modal'

export type ProviderProps = {
  children: ReactNode
  modal?: ModalOptions
  providers?: Array<PartialProviderConfig>
}

export function Provider({ children, modal, providers }: ProviderProps): ReactElement {
  const [providersConfig] = useState(() => getProvidersConfig(providers ?? ['ethereum']))

  return (
    <JotaiProvider scope={stateScope}>
      {children}
      <Modal {...(modal ?? {})} providers={providersConfig} />
    </JotaiProvider>
  )
}
