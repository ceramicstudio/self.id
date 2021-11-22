import { Box } from 'grommet'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Layout from '../../../components/Layout'
import Navbar from '../../../components/Navbar'
import OpenGraphMeta from '../../../components/OpenGraphMeta'

const SocialAccountsScreen = dynamic(
  () => import('../../../components/client/SocialAccountsScreen'),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { getRequestState } = await import('../../../server')
  return { props: { state: await getRequestState(ctx) } }
}

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
