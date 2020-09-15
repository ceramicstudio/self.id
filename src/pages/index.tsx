import { Heading, Main } from 'grommet'
import Head from 'next/head'

export default function Home() {
  return (
    <Main pad="large">
      <Head>
        <title>self.ID</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading>self.ID</Heading>
    </Main>
  )
}
