import { Box } from 'grommet'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import logo from '../images/logo.svg'

const AccountButton = dynamic(() => import('../client/components/AccountButton'), {
  ssr: false,
})

export default function Navbar() {
  return (
    <Box background="white" direction="row" height="80px" pad={{ horizontal: 'medium' }}>
      <Box flex={false} align={'center'} justify={'center'}>
        <Link href="/" passHref={true}>
          <a style={{ marginTop: '0.3rem' }}>
            <img src={logo} alt="Self.ID" />
          </a>
        </Link>
      </Box>
      <Box flex="grow" align="end" justify="center">
        <AccountButton />
      </Box>
    </Box>
  )
}
