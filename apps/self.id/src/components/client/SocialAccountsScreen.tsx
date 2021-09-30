import type { AlsoKnownAsAccount } from '@self.id/framework'
import { Anchor, Box, Button, Heading, Spinner, Text, TextInput } from 'grommet'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { useRemoveSocialAccount, useViewerSocialAccounts } from '../../hooks'
import { GITHUB_HOST, TWITTER_HOST } from '../../identity-link'
import githubIcon from '../../images/icons/social-github.svg'
import twitterIcon from '../../images/icons/social-twitter.svg'

import ConnectedContainer from '../ConnectedContainer'

type SocialAccountType = 'github' | 'twitter'

type SocialAccountsConfig = {
  addLabel: string
  addPrefix: string
  icon: typeof githubIcon
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
  removeAccount: (account: AlsoKnownAsAccount) => void
  removingAccount: AlsoKnownAsAccount | null
  type: SocialAccountType
}

function DisplayAccounts({ accounts, removeAccount, removingAccount, type }: DisplayAccountsProps) {
  const config = SOCIAL_ACCOUNTS_CONFIGS[type]
  const [showAdd, toggleAdd] = useState<boolean>(false)

  const items = accounts.map((a) => {
    const removingButton =
      removingAccount === a ? (
        <Box direction="row" gap="small" justify="center">
          <Text color="neutral-4">Removing...</Text>
          <Spinner size="xsmall" />
        </Box>
      ) : removingAccount === null ? (
        <Anchor color="neutral-4" onClick={() => removeAccount(a)}>
          Remove
        </Anchor>
      ) : (
        <Spinner size="xsmall" />
      )

    return (
      <Box
        key={a.id}
        border={{ color: 'neutral-5', side: 'top' }}
        margin={{ top: 'small' }}
        pad={{ top: 'small' }}
        direction="row">
        <Box flex pad={{ vertical: 'xxsmall' }}>
          <Anchor href={`${a.protocol}://${a.host as string}/${a.id}`}>{a.id}</Anchor>
        </Box>
        {removingButton}
      </Box>
    )
  })

  const addItem = (
    <Box margin={{ top: 'medium' }}>
      <AddAccount label={config.addLabel} urlPrefix={config.addPrefix} />
    </Box>
  )

  return (
    <Box border={{ color: 'neutral-5' }} margin={{ bottom: 'medium' }} pad="medium" round="small">
      <Box>
        <Box direction="row">
          <Box flex>
            <Text weight="bold">
              <Image alt="" src={config.icon} /> {config.title}
            </Text>
          </Box>
          <Box>
            {items.length ? (
              <Button
                label={showAdd ? 'Show list' : 'Add new account'}
                onClick={() => toggleAdd(!showAdd)}
                plain
              />
            ) : null}
          </Box>
        </Box>
      </Box>
      {items.length && !showAdd ? items : addItem}
    </Box>
  )
}

type ListProps = {
  accounts: Array<AlsoKnownAsAccount>
}

function SocialAccountsList({ accounts }: ListProps) {
  const [removingAccount, removeAccount] = useRemoveSocialAccount()

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
    <DisplayAccounts
      key={type}
      type={type as SocialAccountType}
      accounts={accounts}
      removeAccount={removeAccount}
      removingAccount={removingAccount}
    />
  ))

  return <Box margin={{ top: 'medium' }}>{list}</Box>
}

function SocialAccountsLoader() {
  const accountsRecord = useViewerSocialAccounts()

  return accountsRecord.isLoading ? (
    <Text>Loading social accounts...</Text>
  ) : accountsRecord.isError ? (
    <Text>Failed to load social accounts</Text>
  ) : (
    <SocialAccountsList accounts={accountsRecord.content?.accounts ?? []} />
  )
}

export default function SocialAccountsScreen() {
  return (
    <ConnectedContainer>
      <Link href="/me/settings" passHref>
        <Anchor color="neutral-4">Settings</Anchor>
      </Link>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>My social accounts</Heading>
      <SocialAccountsLoader />
    </ConnectedContainer>
  )
}
