import { Provider } from '@self.id/framework'
import CloseIcon from '@self.id/multiauth/assets/icon-close.svg'
import SelectedIcon from '@self.id/multiauth/assets/icon-selected.svg'
import ethereumLogo from '@self.id/multiauth/assets/ethereum.png'
import fortmaticLogo from '@self.id/multiauth/assets/fortmatic.png'
import metamaskLogo from '@self.id/multiauth/assets/metamask.png'
import portisLogo from '@self.id/multiauth/assets/portis.png'
import torusLogo from '@self.id/multiauth/assets/torus.png'
import walletConnectLogo from '@self.id/multiauth/assets/walletconnect.png'
import React from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Root({ children }: Props) {
  return (
    <Provider
      auth={{
        modal: { closeIcon: <CloseIcon />, selectedIcon: <SelectedIcon /> },
        providers: [
          {
            key: 'ethereum',
            logo: ethereumLogo,
            connectors: [
              { key: 'injected', logo: metamaskLogo },
              { key: 'fortmatic', logo: fortmaticLogo },
              { key: 'portis', logo: portisLogo },
              { key: 'torus', logo: torusLogo },
              { key: 'walletConnect', logo: walletConnectLogo },
            ],
          },
        ],
      }}
      ui={{ full: true, style: { display: 'flex', flexDirection: 'column' } }}>
      {children}
    </Provider>
  )
}
