import { Anchor, Box, Paragraph, Text } from 'grommet'
import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'
import styled, { css } from 'styled-components'

import { BRAND_COLOR, PLACEHOLDER_COLOR } from '../../theme'
import type { IDXBasicProfile } from '../../types'

const EditProfileButton = dynamic(() => import('../../components/EditProfileButton'), {
  ssr: false,
})

const LoginButton = dynamic(() => import('../../components/LoginButton'), {
  ssr: false,
})

interface Props {
  did: string | null
  loadedProfile: IDXBasicProfile | null
}

export const getServerSideProps: GetServerSideProps<Props, { did: string }> = async (ctx) => {
  const did = ctx.params?.did ?? null
  let loadedProfile = null

  if (did !== null) {
    try {
      const { idx } = await import('../../server/idx')
      loadedProfile = await idx.get<IDXBasicProfile>('basicProfile', did)
    } catch (err) {
      console.log('error loading profile from IDX', err)
    }
  }

  return {
    props: { did, loadedProfile },
  }
}

const Header = styled.div<{ url?: string }>`
  height: 307px;
  background-color: ${PLACEHOLDER_COLOR};
  ${(props) =>
    props.url &&
    css`
      background-image: url(${props.url});
      background-size: cover;
    `}
`

const Avatar = styled.div<{ url?: string }>`
  width: 146px;
  height: 146px;
  background-color: ${PLACEHOLDER_COLOR};
  border: 3px solid white;
  border-radius: 78px;
  margin-top: -78px;
  ${(props) =>
    props.url &&
    css`
      background-image: url(${props.url});
      background-size: cover;
    `}
`

const Name = styled.h1`
  color: ${BRAND_COLOR};
  font-size: 28px;
  font-weight: 500;
`

interface NoProfileProps {
  did: string | null
  setProfile: (profile: IDXBasicProfile) => void
}

function NoProfile({ did, setProfile }: NoProfileProps) {
  return (
    <Box>
      <Head>
        <title>No profile found | self.ID</title>
      </Head>
      <Header>
        <LoginButton />
      </Header>
      <Box alignSelf="center" width="large">
        <Box direction="row" flex>
          <Avatar />
          <Box flex>
            <Box alignSelf="end" margin="medium" width="150px">
              <EditProfileButton did={did} setProfile={setProfile} />
            </Box>
          </Box>
        </Box>
        <Name>No profile found</Name>
      </Box>
    </Box>
  )
}

export default function Me({ did, loadedProfile }: Props) {
  const [profile, setProfile] = useState<IDXBasicProfile | null>(loadedProfile)

  if (did == null || profile == null) {
    return <NoProfile did={did} setProfile={setProfile} />
  }

  const name = profile.name ?? '(no name)'

  const description = profile.description ? (
    <Paragraph color="neutral-1" fill>
      {profile.description}
    </Paragraph>
  ) : null

  const link = profile.url ? (
    <Anchor href={profile.url} label={profile.url} target="_blank" />
  ) : null
  const linksContainer = link ? <Box margin={{ vertical: 'small' }}>{link}</Box> : null

  const location = profile.homeLocation ? (
    <Text color="neutral-4" margin={{ left: 'medium' }}>
      {profile.homeLocation}
    </Text>
  ) : null
  const country = profile.residenceCountry ? (
    <Text color="neutral-4" margin={{ left: 'medium' }}>
      {profile.residenceCountry}
    </Text>
  ) : null
  const locationContainer =
    location || country ? (
      <Box justify="end" direction="row" margin={{ vertical: 'small' }}>
        {location}
        {country}
      </Box>
    ) : null

  return (
    <Box>
      <Head>
        <title>{name} | self.ID</title>
      </Head>
      <Header url={profile.background}>
        <LoginButton />
      </Header>
      <Box alignSelf="center" width="large">
        <Box direction="row" flex>
          <Avatar url={profile.image} />
          <Box flex>
            <Box alignSelf="end" margin="medium" width="150px">
              <EditProfileButton did={did} setProfile={setProfile} />
            </Box>
          </Box>
        </Box>
        <Name>
          {name}
          {profile.emoji ? ` ${profile.emoji}` : null}
        </Name>
        {description}
        {linksContainer}
        {locationContainer}
      </Box>
    </Box>
  )
}
