import { Avatar, Box, Button, Collapsible, Heading, Text } from 'grommet'
import { useMemo, useState } from 'react'

import { getImageSrc } from '../../image'
import avatarPlaceholder from '../../images/avatar-placeholder.png'
import arrowDownIcon from '../../images/icons/arrow-down.svg'
import arrowUpIcon from '../../images/icons/arrow-up.svg'
import { formatDID } from '../../utils'

import { useDIDsData, useIDXAuth } from '../hooks'
import type { KnownDIDData } from '../idx'

import ConnectedContainer from './ConnectedContainer'

type ItemProps = {
  data: KnownDIDData
  did: string
  selected: boolean
}

function IdentityItem({ data, did, selected }: ItemProps) {
  const { accounts, profile } = data

  const [isOpen, setOpen] = useState<boolean>(false)

  const avatarSrc = useMemo(() => {
    return profile?.image
      ? getImageSrc(profile.image, { height: 65, width: 65 })
      : avatarPlaceholder
  }, [profile])

  const displayAccounts = accounts.map((account) => (
    <Text key={account.address} color="neutral-3">
      {account.address}
    </Text>
  ))

  // TODO: add button to connect account if not selected

  const icon = isOpen ? <img alt="↑" src={arrowUpIcon} /> : <img alt="↓" src={arrowDownIcon} />

  return (
    <Box border={{ color: 'neutral-5' }} margin={{ bottom: 'medium' }} round="small">
      <Box direction="row" gap="small" pad="medium">
        <Avatar size="65px" src={avatarSrc} />
        <Box flex>
          <Text weight="bold">{profile?.name ?? '(no name)'}</Text>
          <Text color="neutral-4">{formatDID(did)}</Text>
        </Box>
        {selected ? (
          <Text color="brand" weight="bold">
            Selected
          </Text>
        ) : null}
      </Box>
      <Box border={{ color: 'neutral-5', side: 'top' }} pad="medium">
        <Button
          color="neutral-3"
          icon={icon}
          label="Accounts"
          onClick={() => setOpen(!isOpen)}
          plain
          reverse
          style={{ alignSelf: 'flex-start' }}
        />
        <Collapsible open={isOpen}>
          <Box pad={{ top: 'small' }}>{displayAccounts}</Box>
        </Collapsible>
      </Box>
    </Box>
  )
}

// type CreateProps = {
//   didsData: KnownDIDsData | null
// }

// type CreateState = { open: boolean; address?: string }

// function CreateNewDID({ didsData }: CreateProps) {
//   const [authState] = useMultiAuth()
//   const [createState, setCreateState] = useState<CreateState>({ open: false })
//   const [creating, create] = useCreateAccount()

//   const createAccount = useCallback(
//     (address: string) => {
//       setCreateState({ open: true, address })
//       create(address).then(
//         () => {
//           setCreateState({ open: false })
//         },
//         (err) => {
//           setCreateState({ open: false })
//         }
//       )
//     },
//     [create, setCreateState]
//   )

//   // TODO: add collapsible to show addresses, with ones already used disabled
//   // also handle state of creating auth provider + calling createAccount()

//   const accountToDID = useMemo(() => {
//     return Object.entries(didsData ?? {}).reduce((acc, [did, data]) => {
//       for (const account of data.accounts) {
//         acc[account.address] = did
//       }
//       return acc
//     }, {} as Record<string, string>)
//   }, [didsData])

//   let account = null
//   if (authState.status === 'CONNECTED') {
//     const { address } = authState.connected.accountID
//     let action
//     if (accountToDID[address] != null) {
//       action = <Text>{formatDID(accountToDID[address])}</Text>
//     } else if (creating) {
//       action = createState.address === address ? <Text>Creating DID...</Text> : null
//     } else {
//       action = <Button label="Use this address" onClick={() => createAccount(address)} />
//     }
//     account = (
//       <Box key={address} direction="row" pad={{ bottom: 'small' }}>
//         <Box flex justify="center">
//           {address}
//         </Box>
//         <Box>{action}</Box>
//       </Box>
//     )
//   }

//   return (
//     <Box border={{ color: 'neutral-5' }} round="small">
//       <Box direction="row">
//         <Box flex pad="medium">
//           <Text weight="bold">Create a new ID</Text>
//         </Box>
//         <Box pad="medium">
//           <Button onClick={() => setCreateState({ open: !createState.open })} plain>
//             <Text color="brand" weight="bold">
//               New ID
//             </Text>
//           </Button>
//         </Box>
//       </Box>
//       <Collapsible open={createState.open}>
//         <Box pad={{ horizontal: 'medium', vertical: 'small' }}>{account}</Box>
//       </Collapsible>
//     </Box>
//   )
// }

export default function IdentitiesScreen() {
  const [auth] = useIDXAuth()
  const [didsData] = useDIDsData()

  const items = useMemo(() => {
    return didsData
      ? Object.entries(didsData).map(([did, data]) => (
          <IdentityItem key={did} data={data} did={did} selected={auth.id === did} />
        ))
      : []
  }, [auth.id, didsData])

  return (
    <ConnectedContainer>
      <Heading>Identities</Heading>
      {items}
      {/* <CreateNewDID didsData={didsData} /> */}
    </ConnectedContainer>
  )
}
