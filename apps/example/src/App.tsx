import { ConnectButton, DisplayState, Provider as MultiAuthProvider } from '@self.id/multiauth'
import { Provider as UIProvider } from '@self.id/ui'
import React from 'react'

export default function App() {
  return (
    <UIProvider>
      <MultiAuthProvider>
        <p>
          <DisplayState />
        </p>
        <p>
          <ConnectButton />
        </p>
      </MultiAuthProvider>
    </UIProvider>
  )
}
