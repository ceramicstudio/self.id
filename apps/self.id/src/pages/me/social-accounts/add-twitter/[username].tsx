import { Box } from 'grommet'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import Layout from '../../../../components/Layout'
import Navbar from '../../../../components/Navbar'
import OpenGraphMeta from '../../../../components/OpenGraphMeta'

const AddTwitterAccountScreen = dynamic(
  () => import('../../../../components/client/AddTwitterAccountScreen'),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { getStateConfig } = await import('../../../../server')
  return { props: { state: await getStateConfig(ctx) } }
}

export default function AddTwitterAccountPage() {
  return (
    <Layout>
      <Head>
        <title>Add Twitter account | Self.ID</title>
        <OpenGraphMeta />
      </Head>
      <Navbar />
      <Box alignSelf="center" margin="large" pad="medium" width="large">
        <AddTwitterAccountScreen />
      </Box>
    </Layout>
  )
}
