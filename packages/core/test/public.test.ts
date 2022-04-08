import { DIDDataStore } from '@glazed/did-datastore'
import { jest } from '@jest/globals'

import { Core, PublicID } from '../src'

describe('PublicID', () => {
  describe('getters', () => {
    test('id', () => {
      const core = new Core({ ceramic: 'http://example.com' })
      const pub = new PublicID({ core, id: 'did:3:123' })
      expect(pub.id).toBe('did:3:123')
    })
  })

  describe('get()', () => {
    test('calls dataStore.get()', async () => {
      const core = new Core({ ceramic: 'http://example.com' })
      const get = jest.fn(() => Promise.resolve({ name: 'Bob' }))
      core._dataStore = { get } as unknown as DIDDataStore
      const pub = new PublicID({ core, id: 'did:3:123' })
      await expect(pub.get('basicProfile')).resolves.toEqual({ name: 'Bob' })
      expect(get).toBeCalledWith('basicProfile', 'did:3:123')
    })
  })
})
