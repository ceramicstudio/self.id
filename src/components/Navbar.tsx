import { Box } from 'grommet'
import dynamic from 'next/dynamic'

import logo from '../images/logo.svg'

const LoginButton = dynamic(() => import('./LoginButton'), {
  ssr: false,
})

export default function Navbar() {
  return (
    <Box direction="row" pad={{ horizontal: 'medium' }}>
      <Box flex={false}>
        <img src={logo} alt="self.ID" />
      </Box>
      <Box flex="grow" align="end" justify="center">
        <LoginButton />
      </Box>
    </Box>
  )
}
