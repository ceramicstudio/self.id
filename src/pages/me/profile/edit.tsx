import { Box } from 'grommet'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Layout from '../../../components/Layout'
import Navbar from '../../../components/Navbar'
import OpenGraphMeta from '../../../components/OpenGraphMeta'

const EditProfileScreen = dynamic(() => import('../../../client/components/EditProfileScreen'), {
  ssr: false,
})

export default function EditProfilePage() {
  return (
    <Layout>
      <Head>
        <title>My profile | Self.ID</title>
        <OpenGraphMeta />
      </Head>
      <Navbar />
      <Box alignSelf="center" margin="large" pad="medium" width="large">
        <EditProfileScreen />
      </Box>
    </Layout>
  )
}
