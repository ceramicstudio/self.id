import { DIDDataStore } from '@glazed/did-datastore'

import { Core, PublicID } from '..'

jest.mock('@glazed/did-datastore')

const DataStore = DIDDataStore as jest.Mock<DIDDataStore>

describe('PublicID', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getters', () => {
    test('id', () => {
      const core = new Core({ ceramic: 'http://example.com' })
      const pub = new PublicID({ core, id: 'did:3:123' })
      expect(pub.id).toBe('did:3:123')
    })
  })

  describe('get()', () => {
    test('calls dataStore.get()', async () => {
      const get = jest.fn(() => Promise.resolve({ name: 'Bob' }))
      DataStore.mockImplementationOnce(() => ({ get } as unknown as DIDDataStore))

      const pub = new PublicID({
        core: new Core({ ceramic: 'http://example.com' }),
        id: 'did:3:123',
      })
      await expect(pub.get('basicProfile')).resolves.toEqual({ name: 'Bob' })
      expect(get).toBeCalledWith('basicProfile', 'did:3:123')
    })
  })
})
