import type { AlsoKnownAsAccount } from '@ceramicstudio/idx-constants'
import { Anchor, Box, Button, Heading, Image, Text, TextInput } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'

// import discordIcon from '../../images/icons/social-discord.svg'
import githubIcon from '../../images/icons/social-github.svg'
import twitterIcon from '../../images/icons/social-twitter.svg'
import { GITHUB_HOST, TWITTER_HOST } from '../../sdk/web'

import { useEnvState } from '../hooks'

import ConnectedContainer from './ConnectedContainer'

type SocialAccountType = 'github' | 'twitter'

type SocialAccountsConfig = {
  addLabel: string
  addPrefix: string
  icon: string
  title: string
}

const SOCIAL_ACCOUNTS_CONFIGS: Record<SocialAccountType, SocialAccountsConfig> = {
  github: {
    addLabel: 'github.com/',
    addPrefix: '/me/social-accounts/add-github/',
    icon: githubIcon,
    title: 'GitHub',
  },
  twitter: {
    addLabel: 'twitter.com/',
    addPrefix: '/me/social-accounts/add-twitter/',
    icon: twitterIcon,
    title: 'Twitter',
  },
}

type AccountsRecord = Record<SocialAccountType, Array<AlsoKnownAsAccount>>

type AddAccountProps = {
  label: string
  urlPrefix: string
}

function AddAccount({ label, urlPrefix }: AddAccountProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = inputRef.current?.value ?? ''
    if (value !== '') {
      void router.push(`${urlPrefix}${value}`)
    }
  }

  return (
    <Box as="form" direction="row" onSubmit={onSubmit}>
      <Box direction="row" flex margin={{ right: 'small' }}>
        <Text alignSelf="center" margin={{ right: 'small' }}>
          {label}
        </Text>
        <TextInput ref={inputRef} />
      </Box>
      <Button label="Add" type="submit" />
    </Box>
  )
}

type DisplayAccountsProps = {
  accounts: Array<AlsoKnownAsAccount>
  type: SocialAccountType
}

function DisplayAccounts({ accounts, type }: DisplayAccountsProps) {
  const config = SOCIAL_ACCOUNTS_CONFIGS[type]

  const items = accounts.map((a) => {
    return (
      <Box key={a.id} direction="row">
        <Box flex>
          <Anchor href={`${a.protocol}${a.host as string}/${a.id}`}>{a.id}</Anchor>
        </Box>
        <Anchor color="neutral-4">Remove</Anchor>
      </Box>
    )
  })

  const addItem = <AddAccount label={config.addLabel} urlPrefix={config.addPrefix} />

  return (
    <Box
      border={{ color: 'neutral-5' }}
      gap="small"
      margin={{ bottom: 'medium' }}
      pad="medium"
      round="small">
      <Box flex justify="center">
        <Text weight="bold">
          <Image src={config.icon} /> {config.title}
        </Text>
        {/* TODO: display add button if there are items */}
      </Box>
      <Box>{items.length ? items : addItem}</Box>
    </Box>
  )
}

type ListProps = {
  accounts: Array<AlsoKnownAsAccount>
}

function SocialAccountsList({ accounts }: ListProps) {
  const accountsByType = useMemo((): AccountsRecord => {
    const github = []
    const twitter = []
    for (const a of accounts) {
      if (a.host === GITHUB_HOST) {
        github.push(a)
      } else if (a.host === TWITTER_HOST) {
        twitter.push(a)
      }
    }
    return { github, twitter }
  }, [accounts])

  const list = Object.entries(accountsByType).map(([type, accounts]) => (
    <DisplayAccounts key={type} type={type as SocialAccountType} accounts={accounts} />
  ))

  return <Box margin={{ top: 'medium' }}>{list}</Box>
}

type LoaderState =
  | { status: 'loading' }
  | { status: 'loaded'; accounts: Array<AlsoKnownAsAccount> }
  | { status: 'error'; error: Error }

function SocialAccountsLoader() {
  const { self } = useEnvState()
  const [state, setState] = useState<LoaderState>({ status: 'loading' })

  useEffect(() => {
    self?.getAlsoKnownAs().then(
      (aka) => {
        setState({ status: 'loaded', accounts: aka?.accounts ?? [] })
      },
      (error: Error) => {
        setState({ status: 'error', error })
      }
    )
  }, [self])

  switch (state.status) {
    case 'loading':
      return <Text>Loading social accounts...</Text>
    case 'error':
      return <Text>Failed to load social accounts: {state.error.message}</Text>
    case 'loaded':
      return <SocialAccountsList accounts={state.accounts} />
  }
}

export default function SocialAccountsScreen() {
  return (
    <ConnectedContainer>
      <Link href="/me/settings">
        <Anchor color="neutral-4">Settings</Anchor>
      </Link>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>My social accounts</Heading>
      <SocialAccountsLoader />
    </ConnectedContainer>
  )
}
