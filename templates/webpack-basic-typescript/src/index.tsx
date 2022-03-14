import { Provider } from '@self.id/framework'
import ethereumLogo from '@self.id/multiauth/assets/ethereum.png'
import metaMaskLogo from '@self.id/multiauth/assets/metamask.png'
import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import App from './App'

render(
  <StrictMode>
    <Provider
      auth={{
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
