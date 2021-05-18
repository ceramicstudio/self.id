import { useMultiAuth } from '@ceramicstudio/multiauth'
import type { AuthAccount } from '@ceramicstudio/multiauth'
import { Box, Button, Layer, Text } from 'grommet'
import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import toast from 'react-hot-toast'

import type { Deferred } from '../../utils'

import { useIDXAuth, useResetIDXEnv } from './idx'

type LoginSelectAccount = {
  accounts: Array<string>
  value: Deferred<string | null>
}

export function useLogin(): [(switchAccount?: boolean) => Promise<string | null>, ReactNode] {
  const [authState, connect] = useMultiAuth()
  const [auth, tryAuth, clearAuth] = useIDXAuth()
  const [select, _setSelect] = useState<LoginSelectAccount | null>(null)

  const login = useCallback(
    async (switchAccount?: boolean) => {
      if (auth.state === 'confirmed' && authState.status === 'connected' && !switchAccount) {
        return auth.id
      }

      let eth: AuthAccount<'ethereum'> | null = null
      try {
        if (switchAccount) {
          clearAuth()
          eth = await connect({ mode: 'force' })
        } else {
          eth = await connect({ mode: 'use' })
        }
      } catch (err) {
        console.warn('Failed to login:', err)
        toast.error((err as Error).message ?? 'Failed to connect')
      }

      return eth
        ? await tryAuth(eth.provider.state.provider as any, eth.provider.state.account)
        : null
    },
    [auth, clearAuth, authState, connect, tryAuth]
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
  const disconnect = useMultiAuth()[2]
  const clearAuth = useIDXAuth()[2]
  const resetEnv = useResetIDXEnv()

  return useCallback(() => {
    resetEnv()
    clearAuth()
    disconnect()
  }, [clearAuth, disconnect, resetEnv])
}
