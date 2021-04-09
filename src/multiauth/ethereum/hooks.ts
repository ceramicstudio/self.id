import { useWeb3React } from '@web3-react/core'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { injected } from './connectors'
import { WEB3_REACT_KEY } from './constants'
import { connectInjectedAtom } from './state'

export function useWeb3ReactKey() {
  return useWeb3React(process.browser ? WEB3_REACT_KEY : undefined)
}

// TODO: when mounting, check for existing window.ethereum, check authorized and try authenticate
// keep track of events to keep track of known accounts

// What are possible states for injected?
// 0 default state = loading
// 1 (sync) check for window.ethereum, state = available/unavailable
// 2 (async) try auth and load state, next state = connected/available
// 3 (event sync) account or chain changed, state = updating + async load state, next state = connected/available

// type InjectedStatus = 'pending' | 'available' | 'unavailable' | 'connected' | 'updating'

type ConnectInjected = {
  connect: () => Promise<void>
  connected: () => Promise<void>
  connecting: boolean
}

export function useConnectInjected(): ConnectInjected {
  const { activate } = useWeb3ReactKey()
  const [connectPromise, setConnectPromise] = useAtom(connectInjectedAtom)

  const connect = useCallback(() => {
    return new Promise<void>((resolve) => {
      const promise = activate(injected, undefined, true)
      void setConnectPromise(promise)
      promise
        .then(
          () => resolve(),
          (err) => {
            console.warn('Failed to handle activation on connect', err)
          }
        )
        .finally(() => {
          void setConnectPromise(null)
        })
    })
  }, [activate, setConnectPromise])

  const connected = useCallback(() => {
    return connectPromise ?? connect()
  }, [connectPromise, connect])

  return { connect, connected, connecting: connectPromise != null }
}

// export function useInjectedEthereumRoot() {
//   const { activate, error } = useWeb3React<Manager>()
//   const [data, setData] = useAtom(ethereumDataAtom)

//   const handleAccount = useCallback(
//     async (providedAddress?: string, providedChainId?: ChainIDParams | string | number) => {
//       try {
//         const [provider, address, chainId] = await Promise.all([
//           injected.getProvider(),
//           providedAddress ?? injected.getAccount(),
//           providedChainId ?? injected.getChainId(),
//         ])
//         if (address == null) {
//           throw new Error('Could not get address')
//         }
//         const account = new AccountID({
//           address,
//           chainId: toChainId(chainId),
//         })
//         const manager = getManager(provider)
//         // @ts-ignore
//         window.manager = manager
//         setData({ account, manager, provider })
//       } catch (err) {
//         console.warn('Failed to handle setting accountId', err)
//       }
//     },
//     [setData]
//   )

//   useEffect(() => {
//     const { ethereum } = window as any
//     if (ethereum != null && typeof ethereum.on === 'function') {
//       const handleChainChanged = (chainId: string | number) => {
//         activate(injected).then(
//           () => handleAccount(data?.account.address, chainId),
//           (err) => {
//             console.warn('Failed to handle activation on chain changed', err)
//           }
//         )
//       }

//       const handleAccountsChanged = (accounts: Array<string>) => {
//         if (accounts.length > 0) {
//           activate(injected).then(
//             () =>
//               handleAccount(
//                 accounts[0],
//                 data?.account.chainId ? toChainId(data.account.chainId.toString()) : undefined
//               ),
//             (err) => {
//               console.warn('Failed to handle activation on accounts changed', err)
//             }
//           )
//         }
//       }

//       const handleNetworkChanged = (networkId: string | number) => {
//         activate(injected).then(
//           () => {
//             if (data?.account == null) {
//               handleAccount()
//             }
//           },
//           (err) => {
//             console.warn('Failed to handle activation on accounts changed', err)
//           }
//         )
//       }

//       ethereum.on('connect', connect)
//       ethereum.on('chainChanged', handleChainChanged)
//       ethereum.on('accountsChanged', handleAccountsChanged)
//       ethereum.on('networkChanged', handleNetworkChanged)

//       return () => {
//         if (typeof ethereum.removeListener === 'function') {
//           ethereum.removeListener('connect', connect)
//           ethereum.removeListener('chainChanged', handleChainChanged)
//           ethereum.removeListener('accountsChanged', handleAccountsChanged)
//           ethereum.removeListener('networkChanged', handleNetworkChanged)
//         }
//       }
//     }
//   }, [data?.account, activate, connect, error, handleAccount])

//   return [data, connect]
// }
