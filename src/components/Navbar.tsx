import { Box } from 'grommet'
import dynamic from 'next/dynamic'

import logoOrange from '../images/logo-orange.svg'
import logoWhite from '../images/logo-white.svg'

const AccountButton = dynamic(() => import('../client/components/AccountButton'), {
  ssr: false,
})

export type Props = {
  variant?: 'orange' | 'white'
}

export default function Navbar({ variant }: Props) {
  return (
    <Box direction="row" pad={{ horizontal: 'medium' }}>
      <Box flex={false}>
        <img src={variant === 'white' ? logoWhite : logoOrange} alt="Self.ID" />
      </Box>
      <Box flex="grow" align="end" justify="center">
        <AccountButton variant={variant} />
      </Box>
    </Box>
  )
}
