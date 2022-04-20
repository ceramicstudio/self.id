import { Box, Button, Grommet, type ThemeType } from 'grommet'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { ReactNode } from 'react'

const AccountButton = dynamic(() => import('./AccountButton'), {
  ssr: false,
})

const theme: ThemeType = {
  global: {
    font: {
      family: 'sans-serif',
    },
  },
}

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Grommet theme={theme}>
      <Box direction="column" flex>
        <Box direction="row" elevation="medium" pad="small">
          <Box>
            <Link href="/new" passHref>
              <Button label="New note" />
            </Link>
          </Box>
          <Box align="flex-end" flex>
            <AccountButton />
          </Box>
        </Box>
        <Box flex>{children}</Box>
      </Box>
    </Grommet>
  )
}
