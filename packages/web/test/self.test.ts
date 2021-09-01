import { DIDDataStore } from '@glazed/did-datastore'
import { DID } from 'dids'

import { SelfID, WebClient } from '..'

const DataStore = DIDDataStore as jest.Mock<DIDDataStore>
const ID = DID as jest.Mock<DID>

jest.mock('@3id/connect')
jest.mock('@glazed/did-datastore')
jest.mock('dids')

describe('SelfID', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    test('throws an error if the provided DID instance is not authenticated', () => {
      const client = new WebClient({ ceramic: 'local' })

      ID.mockImplementationOnce(() => ({ authenticated: false } as unknown as DID))
      const did1 = new ID()
      expect(() => new SelfID({ client, did: did1 })).toThrow(
        'Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()'
      )

      ID.mockImplementationOnce(() => ({ authenticated: true } as unknown as DID))
      const did2 = new ID()
      expect(() => new SelfID({ client, did: did2 })).not.toThrow()
    })
  })

  describe('getters', () => {
    test('client', () => {
      ID.mockImplementationOnce(() => ({ authenticated: true } as unknown as DID))
      const did = new ID()
      const client = new WebClient({ ceramic: 'local' })
      const self = new SelfID({ client, did })
      expect(self.client).toBe(client)
    })

    test('id', () => {
      ID.mockImplementationOnce(() => ({ authenticated: true, id: 'did:3:123' } as unknown as DID))
      const did = new ID()
      const client = new WebClient({ ceramic: 'local' })
      const self = new SelfID({ client, did })
      expect(self.id).toBe('did:3:123')
    })
  })

  describe('get()', () => {
    test('calls dataStore.get()', async () => {
      const get = jest.fn(() => Promise.resolve({ name: 'Bob' }))
      DataStore.mockImplementationOnce(() => ({ get } as unknown as DIDDataStore))
      ID.mockImplementationOnce(() => ({ authenticated: true, id: 'did:3:123' } as unknown as DID))

      const client = new WebClient({ ceramic: 'local' })
      const did = new ID()
      const self = new SelfID({ client, did })

      await expect(self.get('basicProfile')).resolves.toEqual({ name: 'Bob' })
      expect(get).toBeCalledWith('basicProfile', 'did:3:123')
    })
  })

  describe('set()', () => {
    test('calls dataStore.set()', async () => {
      const set = jest.fn(() => 'streamID')
      DataStore.mockImplementationOnce(() => ({ set } as unknown as DIDDataStore))
      ID.mockImplementationOnce(() => ({ authenticated: true } as unknown as DID))

      const client = new WebClient({ ceramic: 'local' })
      const did = new ID()
      const self = new SelfID({ client, did })

      await expect(self.set('basicProfile', { name: 'Bob' })).resolves.toBe('streamID')
      expect(set).toBeCalledWith('basicProfile', { name: 'Bob' })
    })
  })
})
