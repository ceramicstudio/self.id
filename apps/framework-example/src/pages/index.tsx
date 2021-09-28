import {
  DEFAULT_CERAMIC_NETWORK,
  RequestClient,
  createEthereumAuthProvider,
  getRequestViewerID,
  useAuthentication,
  usePublicRecord,
  useViewerRecord,
} from '@self.id/framework'
import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import styles from '../styles/Home.module.css'

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const viewerID = getRequestViewerID(ctx.req)
  console.log('got viewerID', viewerID)
  if (viewerID == null) {
    return { props: {} }
  }

  const client = new RequestClient({ ceramic: DEFAULT_CERAMIC_NETWORK })
  await client.prefetch('basicProfile', viewerID)

  return {
    props: {
      state: { viewerID, hydrate: client.getState() },
    },
  }
}

function DisplayPublic({ did }) {
  const publicRecord = usePublicRecord('basicProfile', did)
  useEffect(() => {
    console.log('public basic profile record', publicRecord)
  }, [publicRecord])

  return (
    <p>
      Public name: {publicRecord.content?.name ?? '(unknown)'} (loading:{' '}
      {publicRecord.isLoading ? 'true' : 'false'})
    </p>
  )
}

const Home: NextPage = () => {
  const [authState, authenticate] = useAuthentication()
  const [inputValue, setInputValue] = useState('')
  const viewerRecord = useViewerRecord('basicProfile')

  useEffect(() => {
    console.log('auth state changed', authState)
  }, [authState])
  useEffect(() => {
    console.log('viewer basic profile record', viewerRecord)
  }, [viewerRecord])

  let displayRecord = null
  if (viewerRecord.isLoadable) {
    if (viewerRecord.isLoading) {
      displayRecord = <p>Loading profile...</p>
    } else {
      displayRecord = <p>Hello {viewerRecord.content?.name ?? 'stranger'}</p>
    }
  } else {
    displayRecord = <p>Connect to load your profile</p>
  }

  let button = null
  if (authState.status === 'authenticated' && viewerRecord.isLoadable && viewerRecord.isMutable) {
    button = (
      <button
        disabled={viewerRecord.isMutating}
        onClick={() => {
          const content = viewerRecord.content ?? {}
          viewerRecord.set({
            ...content,
            name: content.name === 'Bob Test' ? 'Bob Ceramic' : 'Bob Test',
          })
        }}>
        Set name
      </button>
    )
  } else {
    button = (
      <button
        disabled={authState.status === 'authenticating'}
        onClick={() => {
          createEthereumAuthProvider(window.ethereum).then(authenticate)
        }}>
        Connect
      </button>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Self.ID Framework example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {displayRecord}
        {button}
        {inputValue.startsWith('did:') ? <DisplayPublic did={inputValue} /> : null}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />
      </main>
    </div>
  )
}

export default Home
