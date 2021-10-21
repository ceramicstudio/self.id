/**
 * @jest-environment jsdom
 */

import Portis from '@portis/web3'
import Torus from '@toruslabs/torus-embed'
import WalletConnect from '@walletconnect/ethereum-provider'
import Fortmatic from 'fortmatic'

// Use compiled files for tests as Jest doesn't support ESM/import.meta
import {
  connectorsDefaults,
  getConnectorConfig,
  getConnectorsConfig,
  getDefaultConnectorConfig,
} from '..'

class EIP1193Provider {}
class Web3Provider {}

jest.mock('@portis/web3', () => {
  return jest.fn().mockImplementation(() => {
    return { provider: new Web3Provider() }
  })
})
jest.mock('@toruslabs/torus-embed', () => {
  return jest.fn().mockImplementation(() => {
    return { init: jest.fn(), login: jest.fn(), provider: new EIP1193Provider() }
  })
})
jest.mock('@walletconnect/ethereum-provider', () => {
  return jest.fn().mockImplementation(() => new EIP1193Provider())
})
jest.mock('fortmatic', () => {
  return jest.fn().mockImplementation(() => {
    return { getProvider: jest.fn(() => new Web3Provider()) }
  })
})

describe('connectors', () => {
  describe('getDefaultConnectorConfig()', () => {
    test('throws for unsupported connector key', () => {
      expect(() => {
        // @ts-expect-error connector key
        getDefaultConnectorConfig('ethereum', 'foo')
      }).toThrow('No default config for connector: foo')
    })

    test('returns the config if provider is supported', () => {
      expect(getDefaultConnectorConfig('ethereum', 'fortmatic', { apiKey: 'foo' })).toEqual({
        ...connectorsDefaults.fortmatic,
        key: 'fortmatic',
        providerKey: 'web3',
      })
    })

    test('returns null if provider is not supported', () => {
      expect(getDefaultConnectorConfig('ethereum', 'fortmatic')).toBeNull()
    })
  })

  describe('getConnectorConfig()', () => {
    test('accepts a connector key', () => {
      expect(getConnectorConfig('ethereum', 'fortmatic')).toEqual({ key: 'fortmatic' })
    })

    test('accepts a partial config', () => {
      expect(
        getConnectorConfig('ethereum', {
          key: 'fortmatic',
          label: 'Test',
          params: { apiKey: 'foo' },
        })
      ).toEqual({
        ...connectorsDefaults.fortmatic,
        key: 'fortmatic',
        label: 'Test',
        params: { apiKey: 'foo' },
        providerKey: 'web3',
      })
    })
  })

  test('getConnectorsConfig() filters connectors with supported providers', () => {
    expect(
      getConnectorsConfig('ethereum', [
        { key: 'injected' },
        { key: 'fortmatic', params: { apiKey: 'foo' } },
        { key: 'torus' },
      ])
    ).toEqual([
      {
        ...connectorsDefaults.fortmatic,
        key: 'fortmatic',
        params: { apiKey: 'foo' },
        providerKey: 'web3',
      },
    ])
  })

  describe('default configs', () => {
    const { fortmatic, injected, portis, torus, walletConnect } = connectorsDefaults

    describe('Fortmatic connector', () => {
      test('getNetworkProvider()', () => {
        expect(fortmatic.getNetworkProvider('ethereum', { apiKey: 'foo' })).toBe('web3')
        expect(fortmatic.getNetworkProvider('ethereum', {})).toBeNull()
        // @ts-expect-error invalid network
        expect(fortmatic.getNetworkProvider('other', {})).toBeNull()
      })

      describe('getProvider()', () => {
        test('throws for unsupported provider', async () => {
          await expect(fortmatic.getProvider('eip1193')).rejects.toThrow(
            'Unsupported provider: eip1193'
          )
        })

        test('throws for invalid parameters', async () => {
          await expect(fortmatic.getProvider('web3', {})).rejects.toThrow(
            'Missing apiKey parameter for Fortmatic connector'
          )
        })

        test('returns the provider', async () => {
          await expect(fortmatic.getProvider('web3', { apiKey: 'foo' })).resolves.toBeInstanceOf(
            Web3Provider
          )
          expect(Fortmatic).toBeCalledWith('foo')
        })
      })
    })

    describe('Injected connector', () => {
      beforeEach(() => {
        window.ethereum = undefined
      })

      test('getNetworkProvider()', () => {
        // No injected provider
        expect(injected.getNetworkProvider('ethereum')).toBeNull()
        // Inject mock provider
        window.ethereum = { request: jest.fn() }
        expect(injected.getNetworkProvider('ethereum')).toBe('eip1193')
        // @ts-expect-error invalid network
        expect(injected.getNetworkProvider('other')).toBeNull()
      })

      describe('getProvider()', () => {
        test('throws for unsupported provider', async () => {
          await expect(injected.getProvider('web3')).rejects.toThrow('Unsupported provider: web3')
        })

        test('throws if there is no injected provider', async () => {
          await expect(injected.getProvider('eip1193', {})).rejects.toThrow('No injected provider')
        })

        test('returns the provider', async () => {
          window.ethereum = { request: jest.fn() }
          const provider = await injected.getProvider('eip1193')
          expect(provider).toBe(window.ethereum)
        })
      })
    })

    describe('Portis connector', () => {
      test('getNetworkProvider()', () => {
        expect(portis.getNetworkProvider('ethereum', { dAppId: 'foo', network: 'mainet' })).toBe(
          'web3'
        )
        expect(portis.getNetworkProvider('ethereum', {})).toBeNull()
        // @ts-expect-error invalid network
        expect(portis.getNetworkProvider('other', {})).toBeNull()
      })

      describe('getProvider()', () => {
        test('throws for unsupported provider', async () => {
          await expect(portis.getProvider('eip1193')).rejects.toThrow(
            'Unsupported provider: eip1193'
          )
        })

        test('throws for invalid parameters', async () => {
          await expect(portis.getProvider('web3', {})).rejects.toThrow(
            'Missing dAppId parameter for Portis connector'
          )
          await expect(portis.getProvider('web3', { dAppId: 'foo' })).rejects.toThrow(
            'Missing network parameter for Portis connector'
          )
        })

        test('returns the provider', async () => {
          await expect(
            portis.getProvider('web3', { dAppId: 'foo', network: 'mainet' })
          ).resolves.toBeInstanceOf(Web3Provider)
          expect(Portis).toBeCalledWith('foo', 'mainet')
        })
      })
    })

    describe('Torus connector', () => {
      test('getNetworkProvider()', () => {
        expect(torus.getNetworkProvider('ethereum', { network: {} })).toBe('eip1193')
        expect(torus.getNetworkProvider('ethereum', {})).toBeNull()
        // @ts-expect-error invalid network
        expect(torus.getNetworkProvider('other', {})).toBeNull()
      })

      describe('getProvider()', () => {
        test('throws for unsupported provider', async () => {
          await expect(torus.getProvider('web3')).rejects.toThrow('Unsupported provider: web3')
        })

        test('throws for invalid parameters', async () => {
          await expect(torus.getProvider('eip1193', {})).rejects.toThrow(
            'Missing network parameter for Torus connector'
          )
        })

        test('returns the provider', async () => {
          await expect(torus.getProvider('eip1193', { network: {} })).resolves.toBeInstanceOf(
            EIP1193Provider
          )
          expect(Torus).toBeCalled()
        })
      })
    })

    describe('WalletConnect connector', () => {
      test('getNetworkProvider()', () => {
        expect(walletConnect.getNetworkProvider('ethereum', { infuraId: 'foo' })).toBe('eip1193')
        expect(walletConnect.getNetworkProvider('ethereum', { rpc: 'foo' })).toBe('eip1193')
        expect(walletConnect.getNetworkProvider('ethereum', {})).toBeNull()
        // @ts-expect-error invalid network
        expect(walletConnect.getNetworkProvider('other', {})).toBeNull()
      })

      describe('getProvider()', () => {
        test('throws for unsupported provider', async () => {
          await expect(walletConnect.getProvider('web3')).rejects.toThrow(
            'Unsupported provider: web3'
          )
        })

        test('throws for invalid parameters', async () => {
          await expect(walletConnect.getProvider('eip1193', {})).rejects.toThrow(
            'Missing infuraId or rpc parameter for WalletConnect connector'
          )
        })

        test('returns the provider', async () => {
          await expect(
            walletConnect.getProvider('eip1193', { rpc: 'foo' })
          ).resolves.toBeInstanceOf(EIP1193Provider)
          expect(WalletConnect).toBeCalled()
        })
      })
    })
  })
})
