import { Box } from 'grommet'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Layout from '../../../../components/Layout'
import Navbar from '../../../../components/Navbar'
import OpenGraphMeta from '../../../../components/OpenGraphMeta'

const AddGitHubAccountScreen = dynamic(
  () => import('../../../../components/client/AddGitHubAccountScreen'),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { getStateConfig } = await import('../../../../server')
  return { props: { state: await getStateConfig(ctx) } }
}

export default function AddGitHubAccountPage() {
  return (
    <Layout>
      <Head>
        <title>Add GitHub account | Self.ID</title>
        <OpenGraphMeta />
      </Head>
      <Navbar />
      <Box alignSelf="center" margin="large" pad="medium" width="large">
        <AddGitHubAccountScreen />
      </Box>
    </Layout>
  )
}
