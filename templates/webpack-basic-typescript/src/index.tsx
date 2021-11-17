import { Provider } from '@self.id/framework'
import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import App from './App'

render(
  <StrictMode>
    <Provider ui={{ full: true, style: { display: 'flex' } }}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
