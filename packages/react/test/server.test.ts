import { jest } from '@jest/globals'
import { Core } from '@self.id/core'
import { QueryClient } from 'react-query'

import { VIEWER_ID_STORAGE_KEY, RequestClient } from '../src'

describe('server', () => {
  describe('RequestClient', () => {
    const cookie = `${VIEWER_ID_STORAGE_KEY}=did:test:123`

    test('extends Core', () => {
      const client = new RequestClient({ ceramic: 'local' })
      expect(client).toBeInstanceOf(Core)
    })

    test('parses the viewer ID from cookie string', () => {
      const client = new RequestClient({ ceramic: 'local', cookie })
      expect(client.viewerID).toBe('did:test:123')
    })

    describe('prefetch', () => {
      test('returns false if no ID or viewer ID is set', async () => {
        const client = new RequestClient({ ceramic: 'local' })
        await expect(client.prefetch('basicProfile')).resolves.toBe(false)
      })

      test('uses the viewer ID', async () => {
        const prefetchQuery = jest.fn()
        const client = new RequestClient({ ceramic: 'local', cookie })
        client._queryClient = { prefetchQuery } as unknown as QueryClient

        await expect(client.prefetch('basicProfile')).resolves.toBe(true)
        expect(prefetchQuery).toBeCalledWith(['did:test:123', 'basicProfile'], expect.any(Function))
      })

      test('uses the provided ID', async () => {
        const prefetchQuery = jest.fn()
        const client = new RequestClient({ ceramic: 'local', cookie })
        client._queryClient = { prefetchQuery } as unknown as QueryClient
        const id = 'did:test:provided'

        await expect(client.prefetch('basicProfile', id)).resolves.toBe(true)
        expect(prefetchQuery).toBeCalledWith([id, 'basicProfile'], expect.any(Function))
      })
    })

    test('getState() returns the viewer ID and serialized data', () => {
      const client = new RequestClient({ ceramic: 'local', cookie })
      expect(client.getState()).toEqual({
        hydrate: { queries: [], mutations: [] },
        viewerID: 'did:test:123',
      })
    })
  })
})
