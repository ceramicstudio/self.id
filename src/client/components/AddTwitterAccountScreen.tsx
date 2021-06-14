import { Anchor, Box, Button, Heading, Spinner, Text } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { useEnvState } from '../hooks'

import ConnectedContainer from './ConnectedContainer'

export default function AddTwitterAccountScreen() {
  const { self } = useEnvState()
  const [challengeLoading, setChallengeLoading] = useState<boolean>(false)
  const router = useRouter()
  const { username } = router.query

  // TODO: review flow to get challenge before tweet
  const tweetVerification = useCallback(() => {
    if (self == null || typeof username !== 'string' || challengeLoading) {
      return
    }

    const toastId = toast.loading('Loading challenge...')
    setChallengeLoading(true)

    self.getTwitterChallenge(username).then(
      () => {
        setChallengeLoading(false)
      },
      (err: Error) => {
        toast.error(`Failed to get challenge: ${err.message}`, { id: toastId })
        setChallengeLoading(false)
      }
    )
  }, [challengeLoading, username, self, setChallengeLoading])

  return (
    <ConnectedContainer>
      <Link href="/me/social-accounts">
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
            <Text color="neutral-2">
              Tweet a verification from <Text color="brand">@{username as string}</Text>
            </Text>
          </Box>
          <Box>
            {challengeLoading ? (
              <Button disabled icon={<Spinner />} />
            ) : (
              <Button label="Tweet" onClick={tweetVerification} />
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
              Return to this page and verify your account by clicking this button.
            </Text>
          </Box>
          <Box>
            <Button label="Verify" />
          </Box>
        </Box>
      </Box>
    </ConnectedContainer>
  )
}
