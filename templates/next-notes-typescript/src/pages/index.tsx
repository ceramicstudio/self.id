import { Anchor, Box, Heading, Paragraph } from 'grommet'
import Link from 'next/link'

export default function HomePage() {
  return (
    <Box align="center" direction="column" pad="medium">
      <Heading>Notes app</Heading>
      <Paragraph>
        <Link href="/new" passHref>
          <Anchor>Create a new note</Anchor>
        </Link>{' '}
        to get started!
      </Paragraph>
    </Box>
  )
}
