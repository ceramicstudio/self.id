import { Box } from 'grommet'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Navbar from '../../components/Navbar'

const IdentitiesScreen = dynamic(() => import('../../client/components/IdentitiesScreen'), {
  ssr: false,
})

export default function IdentitiesPage() {
  return (
    <Box>
      <Head>
        <title>Identities | Self.ID</title>
      </Head>
      <Navbar />
      <Box alignSelf="center" margin="large" width="large">
        <IdentitiesScreen />
      </Box>
    </Box>
  )
}
