import { Box } from 'grommet'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box direction="row" justify="center">
      <Box fill="horizontal" style={{ maxWidth: 1536 }}>
        {children}
      </Box>
    </Box>
  )
}
