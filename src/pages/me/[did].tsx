import { Anchor, Box, Paragraph, Text } from 'grommet'
import { GetServerSideProps } from 'next'
import React from 'react'
import styled, { css } from 'styled-components'

import { idx } from '../../idx'
import { BRAND_COLOR, PLACEHOLDER_COLOR } from '../../theme'

interface IDXBasicProfile {
  name?: string
  image?: string
  description?: string
  emoji?: string
  background?: string
  birthDate?: string
  url?: string
  gender?: string
  homeLocation?: string
  residenceCountry?: string
  nationalities?: string | Array<string>
  affiliations?: Array<string>
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

function NoProfile() {
  return (
    <Box>
      <Header />
      <Box alignSelf="center" width="large">
        <Avatar />
        <Name>No profile found</Name>
      </Box>
    </Box>
  )
}

export default function Me({ profile }: Props) {
  if (profile == null) {
    return <NoProfile />
  }

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
      <Header url={profile.background} />
      <Box alignSelf="center" width="large">
        <Avatar url={profile.image} />
        <Name>
          {profile.name ?? '(no name)'}
          {profile.emoji ? ` ${profile.emoji}` : null}
        </Name>
        {description}
        {linksContainer}
        {locationContainer}
      </Box>
    </Box>
  )
}
