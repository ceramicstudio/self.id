import { createEthereumAuthProvider, useAuthentication, useViewerRecord } from '@self.id/framework'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [authState, authenticate] = useAuthentication()
  const record = useViewerRecord('basicProfile')

  useEffect(() => {
    console.log('auth state changed', authState)
  }, [authState])
  useEffect(() => {
    console.log('basic profile record', record)
  }, [record])

  let displayRecord = null
  if (record.isLoadable) {
    if (record.isLoading) {
      displayRecord = <p>Loading profile...</p>
    } else {
      displayRecord = <p>Hello {record.value?.name ?? 'stranger'}</p>
    }
  } else {
    displayRecord = <p>Connect to load your profile</p>
  }

  let button = null
  if (authState.status === 'authenticated' && record.isLoadable && record.isMutable) {
    button = (
      <button
        disabled={record.isMutating}
        onClick={() => {
          record.set({ ...(record.value ?? {}), name: 'Bob Ceramic' })
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
      </main>
    </div>
  )
}

export default Home
