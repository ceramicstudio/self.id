import { Provider } from '@self.id/framework'
import React from 'react'

import ConnectButton from './ConnectButton'

export default function App() {
  return (
    <Provider>
      <ConnectButton />
    </Provider>
  )
}
