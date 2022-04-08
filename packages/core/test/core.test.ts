import { CeramicClient } from '@ceramicnetwork/http-client'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import type { ModelTypesToAliases } from '@glazed/types'
import { jest } from '@jest/globals'
import { Resolver } from 'did-resolver'

import { CERAMIC_URLS, Core } from '../src'
import type { CoreModelTypes } from '../src'

describe('Core', () => {
  describe('constructor', () => {
    test('uses known Ceramic URL if alias is provided', () => {
      for (const [alias, url] of Object.entries(CERAMIC_URLS)) {
        const core = new Core({ ceramic: alias })
        // @ts-ignore private property
        const ceramicURL = core.ceramic._apiUrl as string
        expect(ceramicURL.startsWith(url)).toBe(true)
      }
    })

    test('uses provided Ceramic URL if not an alias', () => {
      const core = new Core({ ceramic: 'http://example.com' })
      // @ts-ignore private property
      const ceramicURL = core.ceramic._apiUrl as string
      expect(ceramicURL.startsWith('http://example.com')).toBe(true)
    })

    test('uses provided data model aliases', () => {
      const aliases = {
        schemas: {},
        definitions: {},
        tiles: {},
      } as ModelTypesToAliases<CoreModelTypes>
      const core = new Core({ ceramic: 'http://example.com', aliases })
      expect(core.dataModel.aliases).toBe(aliases)
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
      const core = new Core({ ceramic: 'http://example.com' })
      const createStreamFromGenesis = jest.fn(() => Promise.resolve({ did: null }))
      core._ceramic = { createStreamFromGenesis } as unknown as CeramicClient
      await expect(core.getAccountDID('eip155:1:0x123456')).rejects.toThrow(
        'No DID found for eip155:1:0x123456'
      )
    })

    test('returns the linked DID', async () => {
      const core = new Core({ ceramic: 'http://example.com' })
      const createStreamFromGenesis = jest.fn(() => Promise.resolve({ did: 'did:3:123' }))
      core._ceramic = { createStreamFromGenesis } as unknown as CeramicClient
      await expect(core.getAccountDID('eip155:1:0x123456')).resolves.toBe('did:3:123')
    })
  })

  describe('toDID()', () => {
    test('throws an error if input is CAIP10 and no DID is linked', async () => {
      const core = new Core({ ceramic: 'http://example.com' })
      const createStreamFromGenesis = jest.fn(() => Promise.resolve({ did: null }))
      core._ceramic = { createStreamFromGenesis } as unknown as CeramicClient
      await expect(core.toDID('eip155:1:0x123456')).rejects.toThrow(
        'No DID found for eip155:1:0x123456'
      )
      expect(createStreamFromGenesis).toBeCalled()
    })

    test('returns the linked DID in input is CAIP10', async () => {
      const core = new Core({ ceramic: 'http://example.com' })
      const createStreamFromGenesis = jest.fn(() => Promise.resolve({ did: 'did:3:123' }))
      core._ceramic = { createStreamFromGenesis } as unknown as CeramicClient
      await expect(core.toDID('eip155:1:0x123456')).resolves.toBe('did:3:123')
      expect(createStreamFromGenesis).toBeCalled()
    })

    test('returns the DID if input is DID', async () => {
      const core = new Core({ ceramic: 'http://example.com' })
      const createStreamFromGenesis = jest.fn(() => Promise.resolve({ did: null }))
      core._ceramic = { createStreamFromGenesis } as unknown as CeramicClient
      await expect(core.toDID('did:3:123')).resolves.toBe('did:3:123')
      expect(createStreamFromGenesis).not.toBeCalled()
    })
  })

  describe('get()', () => {
    test('calls toDID() and dataStore.get()', async () => {
      const core = new Core({ ceramic: 'http://example.com' })
      const createStreamFromGenesis = jest.fn(() => Promise.resolve({ did: 'did:3:123' }))
      core._ceramic = { createStreamFromGenesis } as unknown as CeramicClient
      const get = jest.fn(() => Promise.resolve({ name: 'Bob' }))
      core._dataStore = { get } as unknown as DIDDataStore
      await expect(core.get('basicProfile', 'eip155:1:0x123456')).resolves.toEqual({ name: 'Bob' })
      expect(get).toBeCalledWith('basicProfile', 'did:3:123')
    })
  })
})
