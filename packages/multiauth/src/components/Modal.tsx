import { AccountID } from 'caip'
import { Box, Button, Heading, Layer, Text } from 'grommet'
import React from 'react'
import type { ReactElement } from 'react'
import styled from 'styled-components'

import { useAuthState } from '../hooks'
import type {
  AuthAccount,
  AuthenticatedState,
  AuthMethod,
  EthereumProvider,
  ProviderConfig,
} from '../types'
import { deferred } from '../utils'

import { ProviderOption } from './ProviderOption'

const ProvidersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`

const closeIconSrc = new URL('../assets/icon-close.svg', import.meta.url).href

export type ModalOptions = {
  text?: string
  title?: string
}

export type ModalProps = ModalOptions & {
  providers: Array<ProviderConfig>
}

export function Modal({ providers, text, title }: ModalProps): ReactElement | null {
  const [authState, setAuthState] = useAuthState()

  const onCloseModal = () => {
    if (authState.status === 'authenticating') {
      if (authState.method == null) {
        authState.promise.resolve(null)
        setAuthState({ status: 'idle' })
      } else {
        setAuthState({ ...authState, modal: false })
      }
    }
  }

  const ethereumConfig = providers.find((p) => p.key === 'ethereum')
  if (ethereumConfig == null) {
    console.warn('Ethereum provider missing in config')
    return null
  }

  const ethereumWallets = ethereumConfig.connectors.map((connector) => {
    const key = 'ethereum'
    const method: AuthMethod = { key, connector }

    const onClick = () => {
      if (authState.status === 'authenticating') {
        if (authState.method == null) {
          setAuthState({ ...authState, method })
        }
      } else {
        setAuthState({
          status: 'authenticating',
          promise: deferred<AuthAccount<'ethereum'> | null>(),
          method,
          modal: true,
        })
      }

      connector
        .getProvider(key)
        .then((provider) => ethereumConfig.getState(provider))
        .then(
          (state) => {
            if (state.account == null) {
              if (authState.status === 'authenticating') {
                authState.promise.resolve(null)
              }
              setAuthState({ status: 'idle' })
            } else {
              const accountID = new AccountID({ address: state.account, chainId: state.chainID })
              const auth: AuthAccount<'ethereum'> = {
                accountID,
                method,
                state: state as AuthenticatedState<EthereumProvider>,
              }

              if (authState.status === 'authenticating') {
                authState.promise.resolve(auth)
              }
              setAuthState({ status: 'authenticated', auth })
            }
          },
          (error: Error) => {
            if (authState.status === 'authenticating') {
              authState.promise.reject(error)
            }
            setAuthState({ status: 'failed', error })
          }
        )
    }

    return (
      <ProviderOption
        disabled={authState.status === 'authenticating' && authState.method != null}
        key={method.connector.key}
        label={method.connector.label}
        loading={
          authState.status === 'authenticating' &&
          authState.method?.connector.key === method.connector.key
        }
        logo={method.connector.logo}
        onClick={onClick}
      />
    )
  })

  return authState.status === 'authenticating' && authState.modal ? (
    <Layer onEsc={onCloseModal} onClickOutside={onCloseModal}>
      <Box flex="grow" pad="small" width="large">
        <Box direction="row">
          <Box flex="grow">
            <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
              {title ?? 'Connect wallet'}
            </Heading>
          </Box>
          <Box>
            <Button
              icon={<img alt="x" src={closeIconSrc} />}
              onClick={onCloseModal}
              plain
              style={{ padding: '10px' }}
            />
          </Box>
        </Box>
        <Box overflow="auto" height={{ max: 'calc(100vh - 120px)' }}>
          <Box flex={false}>
            {text ? <Text margin={{ bottom: 'small' }}>{text}</Text> : null}
            <Heading level={4} margin={{ vertical: 'small' }}>
              1. Choose network
            </Heading>
            <ProvidersGrid>
              <ProviderOption
                label={ethereumConfig.label}
                logo={ethereumConfig.logo}
                onClick={() => {
                  // Only option, no effect
                }}
                selected
              />
            </ProvidersGrid>
            <Heading level={4} margin={{ vertical: 'small' }}>
              2. Choose wallet
            </Heading>
            <ProvidersGrid>{ethereumWallets}</ProvidersGrid>
          </Box>
        </Box>
      </Box>
    </Layer>
  ) : null
}
