import { CeramicClient } from '@ceramicnetwork/http-client'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import { TileLoader } from '@glazed/tile-loader'
import type { ModelTypesToAliases } from '@glazed/types'
import { Resolver } from 'did-resolver'

import { CERAMIC_URLS, Core } from '../src'
import type { CoreModelTypes } from '../src'

jest.mock('@ceramicnetwork/http-client')
jest.mock('@ceramicnetwork/stream-caip10-link')
jest.mock('@glazed/datamodel')
jest.mock('@glazed/did-datastore')

// eslint-disable-next-line @typescript-eslint/unbound-method
const fromAccount = Caip10Link.fromAccount as jest.Mock<Promise<Caip10Link>>
const DataStore = DIDDataStore as jest.Mock<DIDDataStore>

describe('Core', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    test('uses known Ceramic URL if alias is provided', () => {
      for (const [alias, url] of Object.entries(CERAMIC_URLS)) {
        new Core({ ceramic: alias })
        expect(CeramicClient).toBeCalledWith(url)
      }
      expect(CeramicClient).toBeCalledTimes(4)
    })

    test('uses provided Ceramic URL if not an alias', () => {
      new Core({ ceramic: 'http://example.com' })
      expect(CeramicClient).toBeCalledWith('http://example.com')
    })

    test('uses provided data model', () => {
      const model = {
        schemas: {},
        definitions: {},
        tiles: {},
      } as ModelTypesToAliases<CoreModelTypes>
      new Core({ ceramic: 'http://example.com', model })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      expect(DataModel).toBeCalledWith({ loader: expect.any(TileLoader), model, autopin: true })
    })
  })

  describe('getters', () => {
    test('ceramic', () => {
      const core = new Core({ ceramic: 'http://example.com' })
      expect(core.ceramic).toBeInstanceOf(CeramicClient)
    })

    test('dataModel', () => {
      const core = new Core({ ceramic: 'http://example.com' })
      expect(core.dataModel).toBeInstanceOf(DataModel)
    })

    test('dataStore', () => {
      const core = new Core({ ceramic: 'http://example.com' })
      expect(core.dataStore).toBeInstanceOf(DIDDataStore)
    })

    test('resolver', () => {
      const core = new Core({ ceramic: 'http://example.com' })
      expect(core.resolver).toBeInstanceOf(Resolver)
    })
  })

  describe('getAccountDID()', () => {
    test('throws an error if no DID is linked', async () => {
      fromAccount.mockImplementationOnce(() => Promise.resolve({ did: null } as Caip10Link))
      const core = new Core({ ceramic: 'http://example.com' })
      await expect(core.getAccountDID('0x123456@eip155:1')).rejects.toThrow(
        'No DID found for 0x123456@eip155:1'
      )
    })

    test('returns the linked DID', async () => {
      fromAccount.mockImplementationOnce(() => Promise.resolve({ did: 'did:3:123' } as Caip10Link))
      const core = new Core({ ceramic: 'http://example.com' })
      await expect(core.getAccountDID('0x123456@eip155:1')).resolves.toBe('did:3:123')
    })
  })

  describe('toDID()', () => {
    test('throws an error if input is CAIP10 and no DID is linked', async () => {
      fromAccount.mockImplementationOnce(() => Promise.resolve({ did: null } as Caip10Link))
      const core = new Core({ ceramic: 'http://example.com' })
      await expect(core.toDID('0x123456@eip155:1')).rejects.toThrow(
        'No DID found for 0x123456@eip155:1'
      )
      expect(fromAccount).toBeCalled()
    })

    test('returns the linked DID in input is CAIP10', async () => {
      fromAccount.mockImplementationOnce(() => Promise.resolve({ did: 'did:3:123' } as Caip10Link))
      const core = new Core({ ceramic: 'http://example.com' })
      await expect(core.toDID('0x123456@eip155:1')).resolves.toBe('did:3:123')
      expect(fromAccount).toBeCalled()
    })

    test('returns the DID in input is DID', async () => {
      const core = new Core({ ceramic: 'http://example.com' })
      await expect(core.toDID('did:3:123')).resolves.toBe('did:3:123')
      expect(fromAccount).not.toBeCalled()
    })
  })

  describe('get()', () => {
    test('calls toDID() and dataStore.get()', async () => {
      fromAccount.mockImplementationOnce(() => Promise.resolve({ did: 'did:3:123' } as Caip10Link))
      const get = jest.fn(() => Promise.resolve({ name: 'Bob' }))
      DataStore.mockImplementationOnce(() => ({ get } as unknown as DIDDataStore))

      const core = new Core({ ceramic: 'http://example.com' })
      await expect(core.get('basicProfile', '0x123456@eip155:1')).resolves.toEqual({ name: 'Bob' })
      expect(get).toBeCalledWith('basicProfile', 'did:3:123')
    })
  })
})
