import { Text } from 'grommet'

import { useIDXAuth } from '../hooks'

export default function DisplayDID() {
  const [auth] = useIDXAuth()

  let text
  switch (auth.state) {
    case 'LOADING':
      text = 'Loading DID...'
      break
    case 'CONFIRMED':
    case 'LOCAL':
      text = auth.id
      break
    default:
      text = 'Login to display DID'
  }

  return <Text color="neutral-3">{text}</Text>
}
