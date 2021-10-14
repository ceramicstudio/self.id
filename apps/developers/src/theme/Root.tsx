import { Provider } from '@self.id/framework'
import React from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Root({ children }: Props) {
  return (
    <Provider ui={{ full: true, style: { display: 'flex', flexDirection: 'column' } }}>
      {children}
    </Provider>
  )
}
