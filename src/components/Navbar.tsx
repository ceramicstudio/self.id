import { Box } from 'grommet'
import dynamic from 'next/dynamic'

import logo from '../images/logo.svg'

const AccountButton = dynamic(() => import('./AccountButton'), {
  ssr: false,
})

export default function Navbar() {
  return (
    <Box direction="row" pad={{ horizontal: 'medium' }}>
      <Box flex={false}>
        <img src={logo} alt="Self.ID" />
      </Box>
      <Box flex="grow" align="end" justify="center">
        <AccountButton />
      </Box>
    </Box>
  )
}
