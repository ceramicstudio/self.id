/**
 * @jest-environment jsdom
 */

import { ChainId } from 'caip'

import {
  getEIP1193Account,
  getEIP1193ProviderState,
  getEthereumProviderState,
  getWeb3Account,
  getWeb3ProviderState,
  toChainID,
} from '../src/networks/ethereum'
import type { EIP1193Provider, Web3Provider } from '../src/providers/types'

// Use compiled files for tests as Jest doesn't support ESM/import.meta
import { getDefaultNetworkConfig, getNetworkConfig, getNetworksConfig, networksDefaults } from '..'

describe('networks', () => {
  describe('getDefaultNetworkConfig()', () => {
    test('throws for unsupported network key', () => {
      expect(() => {
        // @ts-expect-error network key
        getDefaultNetworkConfig('foo')
      }).toThrow('No default config for network: foo')
    })

    test('returns the config if provider is supported', () => {
      expect(getDefaultNetworkConfig('ethereum')).toEqual({
        ...networksDefaults.ethereum,
        key: 'ethereum',
        connectors: [],
      })
    })
  })

  describe('getNetworkConfig()', () => {
    test('throws for unsupported network key', () => {
      expect(() => {
        // @ts-expect-error network key
        getNetworkConfig('foo')
      }).toThrow('No default config for network: foo')
    })

    test('accepts a network key', () => {
      expect(getNetworkConfig('ethereum')).toEqual({
        ...networksDefaults.ethereum,
        key: 'ethereum',
        connectors: [],
      })
    })

    test('accepts a partial config', () => {
      expect(
        getNetworkConfig({
          key: 'ethereum',
          label: 'Test',
        })
      ).toEqual({
        ...networksDefaults.ethereum,
        key: 'ethereum',
        label: 'Test',
        connectors: [],
      })
    })
  })

  test('getNetworksConfig() gets the config for the provided networks', () => {
    expect(getNetworksConfig(['ethereum'])).toEqual([
      {
        ...networksDefaults.ethereum,
        key: 'ethereum',
        connectors: [],
      },
    ])
  })

  describe('Ethereum network', () => {
    describe('toChainID()', () => {
      test('with number input', () => {
        const id = toChainID(1)
        expect(id).toBeInstanceOf(ChainId)
        expect(id.toString()).toBe('eip155:1')
      })

      test('with string input', () => {
        const id = toChainID('0x03')
        expect(id).toBeInstanceOf(ChainId)
        expect(id.toString()).toBe('eip155:3')
      })

      test('with ChainIdParams input', () => {
        const id = toChainID({ namespace: 'eip155', reference: '4' })
        expect(id).toBeInstanceOf(ChainId)
        expect(id.toString()).toBe('eip155:4')
      })

      test('with ChainId input', () => {
        const id = new ChainId({ namespace: 'eip155', reference: '4' })
        const same = toChainID(id)
        expect(same).toBe(id)
      })
    })

    describe('getEIP1193Account()', () => {
      test('request accounts and returns the first one', async () => {
        const account = '0x123'
        const request = jest.fn(() => [account])
        await expect(getEIP1193Account({ request } as unknown as EIP1193Provider)).resolves.toBe(
          account
        )
        expect(request).toBeCalledWith({ method: 'eth_requestAccounts' })
      })

      test('returns null if there is no account', async () => {
        await expect(
          getEIP1193Account({ request: () => [] } as unknown as EIP1193Provider)
        ).resolves.toBeNull()
      })

      test('returns null if the request fails', async () => {
        await expect(
          getEIP1193Account({
            request: () => {
              throw new Error('Failed')
            },
          } as unknown as EIP1193Provider)
        ).resolves.toBeNull()
      })
    })

    describe('getWeb3Account()', () => {
      test('request accounts and returns the first one', async () => {
        const account = '0x123'
        const enable = jest.fn(() => [account])
        await expect(getWeb3Account({ enable } as unknown as Web3Provider)).resolves.toBe(account)
        expect(enable).toBeCalled()
      })

      test('returns null if there is no account', async () => {
        await expect(
          getWeb3Account({ enable: () => [] } as unknown as Web3Provider)
        ).resolves.toBeNull()
      })

      test('returns null if the request fails', async () => {
        await expect(
          getWeb3Account({
            enable: () => {
              throw new Error('Failed')
            },
          } as unknown as Web3Provider)
        ).resolves.toBeNull()
      })
    })

    test('getEIP1193ProviderState() returns the provider state', async () => {
      const request = jest.fn((req: { method: string }) => {
        if (req.method === 'eth_chainId') {
          return '0x03'
        }
        if (req.method === 'eth_requestAccounts') {
          return ['0x123']
        }
        throw new Error(`Unsupported method: ${req.method}`)
      })
      const state = await getEIP1193ProviderState({ request } as unknown as EIP1193Provider)
      expect(state.account).toBe('0x123')
      expect(state.chainID).toBeInstanceOf(ChainId)
      expect(state.chainID.toString()).toBe('eip155:3')
      expect(request).toBeCalledTimes(2)
    })

    test('getWeb3ProviderState() returns the provider state', async () => {
      const enable = jest.fn(() => ['0x123'])
      const sendAsync = jest.fn((_req, cb: (err: Error | null, res?: any) => void) => {
        cb(null, { result: '0x03' })
      })
      const state = await getWeb3ProviderState({ enable, sendAsync } as unknown as Web3Provider)
      expect(state.account).toBe('0x123')
      expect(state.chainID).toBeInstanceOf(ChainId)
      expect(state.chainID.toString()).toBe('eip155:3')
      expect(enable).toBeCalled()
      expect(sendAsync).toBeCalled()
    })

    describe('getEthereumProviderState()', () => {
      test('with eip1193 provider key', async () => {
        const request = jest.fn((req: { method: string }) => {
          if (req.method === 'eth_chainId') {
            return '0x03'
          }
          if (req.method === 'eth_requestAccounts') {
            return ['0x123']
          }
          throw new Error(`Unsupported method: ${req.method}`)
        })
        const provider = { request } as unknown as EIP1193Provider
        await expect(getEthereumProviderState('eip1193', provider)).resolves.toEqual({
          account: '0x123',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          chainID: expect.any(ChainId),
          provider,
          providerKey: 'eip1193',
        })
      })

      test('with web3 provider key', async () => {
        const enable = jest.fn(() => ['0x123'])
        const sendAsync = jest.fn((_req, cb: (err: Error | null, res?: any) => void) => {
          cb(null, { result: '0x03' })
        })
        const provider = { enable, sendAsync } as unknown as Web3Provider
        await expect(getEthereumProviderState('web3', provider)).resolves.toEqual({
          account: '0x123',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          chainID: expect.any(ChainId),
          provider,
          providerKey: 'web3',
        })
      })

      test('with unexpected provider key', async () => {
        // @ts-expect-error provider key
        await expect(getEthereumProviderState('other', {})).rejects.toThrow(
          'Unsupported Ethereum provider: other'
        )
      })
    })
  })
})
