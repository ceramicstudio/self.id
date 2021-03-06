import { Text } from 'grommet'

import { useIDXAuth } from '../hooks'

export default function DisplayDID() {
  const [auth] = useIDXAuth()

  let text
  switch (auth.state) {
    case 'loading':
      text = 'Loading DID...'
      break
    case 'confirmed':
    case 'local':
      text = auth.id
      break
    default:
      text = 'Login to display DID'
  }

  return <Text color="neutral-3">{text}</Text>
}
