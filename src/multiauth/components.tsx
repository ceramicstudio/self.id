import { AccountID } from 'caip'
import { Box, Button, Heading, Grommet, Layer, Spinner, Text } from 'grommet'
import type { ThemeType } from 'grommet'
import { Provider as JotaiProvider, useAtom } from 'jotai'
import type { ReactNode } from 'react'

import { defaultConfig } from './config'
import { scope } from './constants'
import { EthereumProvider } from './ethereum/components'
import { useConnection } from './ethereum/hooks'
import { authStateAtom } from './state'
import type { AuthAccount, ProviderConfig, ProviderType } from './types'
import { deferred } from './utils'

export type ModalProps = {
  config: ProviderConfig
  theme?: ThemeType
}

function Modal({ config, theme }: ModalProps) {
  const connect = useConnection()[0]
  const [authState, setAuthState] = useAtom(authStateAtom)

  const errorMessage =
    authState.status === 'FAILED' ? (
      <Text color="status-error" margin={{ bottom: 'medium' }}>
        {authState.error?.message ?? 'Authentication failed'}
      </Text>
    ) : null

  const options = Object.entries(config.ethereum.connectors).map(([connector, method]) => {
    if (method == null) {
      return null
    }

    const onClick = () => {
      if (authState.status === 'CONNECTING') {
        if (authState.provider == null) {
          void setAuthState({ ...authState, provider: { type: 'ethereum', method } })
        }
      } else {
        void setAuthState({
          status: 'CONNECTING',
          promise: deferred<AuthAccount<ProviderType> | null>(),
          provider: { type: 'ethereum', method },
          modal: true,
        })
      }

      connect(method.connector).then(
        (state) => {
          if (state == null) {
            return setAuthState({ status: 'DISCONNECTED' })
          }

          const connected: AuthAccount<'ethereum'> = {
            accountID: new AccountID({ address: state.account, chainId: state.chainID }),
            provider: { method, state },
          }

          if (authState.status === 'CONNECTING') {
            authState.promise.resolve(connected)
          }
          void setAuthState({ status: 'CONNECTED', connected })
        },
        (error: Error) => {
          if (authState.status === 'CONNECTING') {
            authState.promise.reject(error)
          }
          void setAuthState({ status: 'FAILED', error })
        }
      )
    }

    return (
      <Button
        disabled={authState.status === 'CONNECTING' && authState.provider != null}
        icon={
          authState.status === 'CONNECTING' &&
          authState.provider?.method.connector === method.connector ? (
            <Spinner />
          ) : undefined
        }
        key={connector}
        label={method.label}
        margin={{ bottom: 'small' }}
        onClick={onClick}
      />
    )
  })

  return (
    <Grommet plain theme={theme}>
      {authState.status === 'CONNECTING' && authState.modal ? (
        <Layer
          onEsc={() => {
            void setAuthState({ ...authState, modal: false })
          }}
          onClickOutside={() => {
            void setAuthState({ ...authState, modal: false })
          }}>
          <Box width="large" pad="small">
            <Heading size="2">Ethereum wallet</Heading>
            {errorMessage}
            {options}
          </Box>
        </Layer>
      ) : null}
    </Grommet>
  )
}

export type ProviderProps = {
  children: ReactNode
  config?: ProviderConfig
  theme?: ThemeType
}

export function Provider({ children, config = defaultConfig, theme }: ProviderProps) {
  return (
    <JotaiProvider scope={scope}>
      <EthereumProvider config={config.ethereum}>
        {children}
        <Modal config={config} theme={theme} />
      </EthereumProvider>
    </JotaiProvider>
  )
}
