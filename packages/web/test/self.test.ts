import { CeramicClient } from '@ceramicnetwork/http-client'
import { DIDDataStore } from '@glazed/did-datastore'
import type { DID } from 'dids'

import { SelfID, WebClient } from '../src'

const Ceramic = CeramicClient as jest.Mock<CeramicClient>
const DataStore = DIDDataStore as jest.Mock<DIDDataStore>

jest.mock('@3id/connect')
jest.mock('@ceramicnetwork/http-client')
jest.mock('@glazed/did-datastore')

describe('SelfID', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    test('throws an error if the provided DID instance is not authenticated', () => {
      Ceramic.mockImplementationOnce(
        () => ({ did: { authenticated: false } } as unknown as CeramicClient)
      )

      expect(() => new SelfID({ client: new WebClient({ ceramic: 'local' }) })).toThrow(
        'Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()'
      )

      Ceramic.mockImplementationOnce(
        () => ({ did: { authenticated: true } } as unknown as CeramicClient)
      )
      expect(() => new SelfID({ client: new WebClient({ ceramic: 'local' }) })).not.toThrow()
    })
  })

  describe('getters', () => {
    test('client', () => {
      Ceramic.mockImplementationOnce(
        () => ({ did: { authenticated: true } } as unknown as CeramicClient)
      )
      const client = new WebClient({ ceramic: 'local' })
      const self = new SelfID({ client })
      expect(self.client).toBe(client)
    })

    describe('did', () => {
      test('throws if there is no authenticated DID', () => {
        // Need to use authenticated DID in constructor, otherwise it will throw there
        const ceramic = {
          did: { authenticated: true, id: 'did:3:123' },
        } as unknown as CeramicClient
        Ceramic.mockImplementationOnce(() => ceramic)
        const self = new SelfID({ client: new WebClient({ ceramic: 'local' }) })

        ceramic.did = { authenticated: false } as unknown as DID
        expect(() => self.did).toThrow(
          'Expected authenticated DID instance to be attached to Ceramic'
        )
      })

      test('returns the authenticed DID', () => {
        const did = { authenticated: true, id: 'did:3:123' }
        Ceramic.mockImplementationOnce(() => ({ did } as unknown as CeramicClient))
        const self = new SelfID({ client: new WebClient({ ceramic: 'local' }) })
        expect(self.did).toBe(did)
      })
    })

    test('id', () => {
      Ceramic.mockImplementationOnce(
        () => ({ did: { authenticated: true, id: 'did:3:123' } } as unknown as CeramicClient)
      )
      const client = new WebClient({ ceramic: 'local' })
      const self = new SelfID({ client })
      expect(self.id).toBe('did:3:123')
    })
  })

  describe('get()', () => {
    test('calls dataStore.get()', async () => {
      const get = jest.fn(() => Promise.resolve({ name: 'Bob' }))
      Ceramic.mockImplementationOnce(
        () => ({ did: { authenticated: true, id: 'did:3:123' } } as unknown as CeramicClient)
      )
      DataStore.mockImplementationOnce(() => ({ get } as unknown as DIDDataStore))

      const client = new WebClient({ ceramic: 'local' })
      const self = new SelfID({ client })

      await expect(self.get('basicProfile')).resolves.toEqual({ name: 'Bob' })
      expect(get).toBeCalledWith('basicProfile', 'did:3:123')
    })
  })

  describe('set()', () => {
    test('calls dataStore.set()', async () => {
      const set = jest.fn(() => 'streamID')
      Ceramic.mockImplementationOnce(
        () => ({ did: { authenticated: true } } as unknown as CeramicClient)
      )
      DataStore.mockImplementationOnce(() => ({ set } as unknown as DIDDataStore))

      const client = new WebClient({ ceramic: 'local' })
      const self = new SelfID({ client })

      await expect(self.set('basicProfile', { name: 'Bob' })).resolves.toBe('streamID')
      expect(set).toBeCalledWith('basicProfile', { name: 'Bob' })
    })
  })
})
