import copy from 'copy-to-clipboard'
import { Anchor, Box, Button, Heading, Spinner, Text } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { useEnvState } from '../hooks'

import ConnectedContainer from './ConnectedContainer'

function createTweetLink(did: string): string {
  const text = encodeURIComponent(
    `Verifying my Twitter account for my decentralized identity ${did} on @ceramicnetwork via @mySelfID.\n\nView my Self.ID here ↓`
  )
  const url = encodeURIComponent(`${document.location.origin}/${did}`)
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`
}

export default function AddTwitterAccountScreen() {
  const { self } = useEnvState()
  const [challengeLoading, setChallengeLoading] = useState<boolean>(false)
  const [challenge, setChallenge] = useState<string | null>(null)
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false)
  const router = useRouter()
  const { username } = router.query
  const did = self?.id as string

  const copyMessage = useCallback(() => {
    if (self == null || typeof username !== 'string' || challengeLoading) {
      return
    }

    const toastId = toast.loading('Loading challenge...')
    setChallengeLoading(true)

    self.getTwitterChallenge(username).then(
      (challenge) => {
        setChallenge(challenge)
        if (copy(self.id)) {
          toast.success('Copied to clipboard!', { id: toastId })
        } else {
          toast.error('Failed to copy to clipboard', { id: toastId })
        }
        setChallengeLoading(false)
      },
      (err: Error) => {
        toast.error(`Failed to get challenge: ${err.message}`, { id: toastId })
        setChallengeLoading(false)
      }
    )
  }, [challengeLoading, username, self])

  const verify = useCallback(() => {
    if (self == null || challenge == null || typeof username !== 'string' || verifyLoading) {
      return
    }

    const toastId = toast.loading('Verifying...')
    setVerifyLoading(true)

    self.addTwitterAttestation(username, challenge).then(
      () => {
        toast.success('Attestation added!', { id: toastId })
        setVerifyLoading(false)
        return router.push('/me/social-accounts')
      },
      (err: Error) => {
        toast.error(`Failed to verify or add attestation: ${err.message}`, { id: toastId })
        setVerifyLoading(false)
      }
    )
  }, [challenge, router, self, username, verifyLoading])

  return (
    <ConnectedContainer>
      <Link href="/me/social-accounts" passHref>
        <Anchor color="neutral-4">Social accounts</Anchor>
      </Link>
      <Heading margin={{ horizontal: 'none', vertical: 'small' }}>Verify Twitter account</Heading>
      <Box margin={{ top: 'medium' }}>
        <Box
          border={{ color: 'neutral-5' }}
          direction="row"
          margin={{ bottom: 'medium' }}
          pad="medium"
          round="small">
          <Box flex>
            <Text margin={{ bottom: 'small' }} weight="bold">
              Step 1
            </Text>
            <Text color="neutral-2">Click this button to copy the verification message.</Text>
          </Box>
          <Box>
            {challengeLoading ? (
              <Button disabled icon={<Spinner />} />
            ) : (
              <Button disabled={verifyLoading} label="Copy" onClick={copyMessage} />
            )}
          </Box>
        </Box>
        <Box
          border={{ color: 'neutral-5' }}
          direction="row"
          margin={{ bottom: 'medium' }}
          pad="medium"
          round="small">
          <Box flex>
            <Text margin={{ bottom: 'small' }} weight="bold">
              Step 2
            </Text>
            <Text color="neutral-2">
              Tweet a verification from <Text color="brand">@{username as string}</Text>
            </Text>
          </Box>
          <Box>
            <Button
              disabled={challenge == null}
              href={createTweetLink(did)}
              label="Tweet"
              target="_blank"
            />
          </Box>
        </Box>
        <Box
          border={{ color: 'neutral-5' }}
          direction="row"
          margin={{ bottom: 'medium' }}
          pad="medium"
          round="small">
          <Box flex>
            <Text margin={{ bottom: 'small' }} weight="bold">
              Step 3
            </Text>
            <Text color="neutral-2">
              Return to this page and verify your account by clicking this button.
            </Text>
          </Box>
          <Box>
            {verifyLoading ? (
              <Button disabled icon={<Spinner />} />
            ) : (
              <Button disabled={challenge == null} label="Verify" onClick={verify} />
            )}
          </Box>
        </Box>
      </Box>
    </ConnectedContainer>
  )
}
