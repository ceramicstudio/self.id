import { Heading, Main } from 'grommet'
import { GetServerSideProps } from 'next'
import React from 'react'

import { idx } from '../../idx'

interface IDXBasicProfile {
  name?: string
}

interface Props {
  profile: IDXBasicProfile | null
}

export const getServerSideProps: GetServerSideProps<Props, { did: string }> = async (ctx) => {
  let profile = null
  try {
    profile = await idx.get<IDXBasicProfile>('basicProfile', ctx.params?.did)
  } catch (err) {
    console.log('error loading profile from IDX', err)
  }

  return {
    props: { profile },
  }
}

export default function Me({ profile }: Props) {
  return (
    <Main pad="large">
      {profile ? (
        <Heading>Hello {profile.name ?? 'stranger'}!</Heading>
      ) : (
        <Heading>Profile not found!</Heading>
      )}
    </Main>
  )
}
