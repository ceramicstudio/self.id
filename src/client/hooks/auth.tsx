import { Box, Button, Layer, Text } from 'grommet'
import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { deferred } from '../../utils'
import type { Deferred } from '../../utils'

import { useEthereum } from './ethereum'
import { useIDXAuth, useResetIDXEnv } from './idx'

type LoginSelectAccount = {
  accounts: Array<string>
  value: Deferred<string | null>
}

export function useLogin(): [(switchAccount?: boolean) => Promise<string | null>, ReactNode] {
  const [ethereum, connect, disconnect] = useEthereum()
  const [auth, tryAuth, clearAuth] = useIDXAuth()
  const [select, setSelect] = useState<LoginSelectAccount | null>(null)

  const login = useCallback(
    async (switchAccount?: boolean) => {
      if (auth.state === 'CONFIRMED' && ethereum.status === 'CONNECTED' && !switchAccount) {
        return Promise.resolve(auth.id)
      }

      let eth
      if (switchAccount) {
        clearAuth()
        disconnect()
        eth = await connect(true)
      } else {
        eth = await (ethereum.status === 'CONNECTING' ? ethereum.promise : connect())
      }

      if (eth == null) {
        return null
      }
      if (eth.accounts.length === 1) {
        return await tryAuth(eth.provider, eth.accounts[0])
      }

      const value = deferred<string | null>()
      setSelect({ accounts: eth.accounts, value })
      const selected = await value
      setSelect(null)
      return selected ? await tryAuth(eth.provider, selected) : null
    },
    [auth, clearAuth, connect, disconnect, ethereum, tryAuth]
  )

  const onClose = useCallback(() => {
    if (select != null) {
      select.value.resolve(null)
    }
  }, [select])

  const selectAccountModal = useMemo(() => {
    if (select == null) {
      return null
    }

    const accounts = select.accounts.map((account) => {
      return (
        <Button
          key={account}
          label={account}
          margin={{ top: 'small' }}
          onClick={() => select.value.resolve(account)}
        />
      )
    })

    return (
      <Layer margin="small" onClickOutside={() => onClose()} onEsc={() => onClose()}>
        <Box pad="medium">
          <Text size="large" textAlign="center">
            Select account
          </Text>
          {accounts}
        </Box>
      </Layer>
    )
  }, [select, onClose])

  return [login, selectAccountModal]
}

export function useLogout() {
  const [_eth, _connect, disconnect] = useEthereum()
  const [__auth, _tryAuth, clearAuth] = useIDXAuth()
  const resetEnv = useResetIDXEnv()

  return useCallback(() => {
    resetEnv()
    clearAuth()
    disconnect()
  }, [clearAuth, disconnect, resetEnv])
}
