import { Box } from 'grommet'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Layout from '../../../components/Layout'
import Navbar from '../../../components/Navbar'
import OpenGraphMeta from '../../../components/OpenGraphMeta'

const SocialAccountsScreen = dynamic(
  () => import('../../../client/components/SocialAccountsScreen'),
  { ssr: false }
)

export default function SocialAccountsPage() {
  return (
    <Layout>
      <Head>
        <title>My social accounts | Self.ID</title>
        <OpenGraphMeta />
      </Head>
      <Navbar />
      <Box alignSelf="center" margin="large" pad="medium" width="large">
        <SocialAccountsScreen />
      </Box>
    </Layout>
  )
}
