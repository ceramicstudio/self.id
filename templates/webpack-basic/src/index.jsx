import { Provider } from '@self.id/framework'
import closeIcon from '@self.id/multiauth/assets/icon-close.svg'
import selectedIcon from '@self.id/multiauth/assets/icon-selected.svg'
import ethereumLogo from '@self.id/multiauth/assets/ethereum.png'
import metaMaskLogo from '@self.id/multiauth/assets/metamask.png'
import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import App from './App'

render(
  <StrictMode>
    <Provider
      auth={{
        modal: { closeIcon, selectedIcon },
        networks: [
          {
            key: 'ethereum',
            logo: ethereumLogo,
            connectors: [{ key: 'injected', logo: metaMaskLogo }],
          },
        ],
      }}
      ui={{ full: true, style: { display: 'flex' } }}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
