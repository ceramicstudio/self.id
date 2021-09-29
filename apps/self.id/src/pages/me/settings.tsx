import { Box } from 'grommet'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import OpenGraphMeta from '../../components/OpenGraphMeta'

const SettingsScreen = dynamic(() => import('../../components/client/SettingsScreen'), {
  ssr: false,
})

export default function SettingsPage() {
  return (
    <Layout>
      <Head>
        <title>Settings | Self.ID</title>
        <OpenGraphMeta />
      </Head>
      <Navbar />
      <Box alignSelf="center" margin="large" pad="medium" width="large">
        <SettingsScreen />
      </Box>
    </Layout>
  )
}
