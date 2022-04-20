/**
 * @jest-environment ./jest-environment-jsdom-fix
 */

import { CeramicClient } from '@ceramicnetwork/http-client'
import { DIDDataStore } from '@glazed/did-datastore'
import { jest } from '@jest/globals'
import type { DID } from 'dids'

import { SelfID, WebClient } from '../src'

describe('SelfID', () => {
  describe('constructor', () => {
    test('throws an error if the provided DID instance is not authenticated', () => {
      const client = new WebClient({ ceramic: 'local' })
      client._ceramic = { did: { authenticated: false } } as unknown as CeramicClient

      expect(() => new SelfID({ client })).toThrow(
        'Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()'
      )

      client._ceramic = { did: { authenticated: true } } as unknown as CeramicClient
      expect(() => new SelfID({ client })).not.toThrow()
    })
  })

  describe('getters', () => {
    test('client', () => {
      const client = new WebClient({ ceramic: 'local' })
      client._ceramic = { did: { authenticated: true } } as unknown as CeramicClient
      const self = new SelfID({ client })
      expect(self.client).toBe(client)
    })

    describe('did', () => {
      test('throws if there is no authenticated DID', () => {
        const ceramic = {
          did: { authenticated: true, id: 'did:3:123' },
        } as unknown as CeramicClient

        const client = new WebClient({ ceramic: 'local' })
        // Need to use authenticated DID in constructor, otherwise it will throw there
        client._ceramic = ceramic
        const self = new SelfID({ client })

        ceramic.did = { authenticated: false } as unknown as DID
        expect(() => self.did).toThrow(
          'Expected authenticated DID instance to be attached to Ceramic'
        )
      })

      test('returns the authenticed DID', () => {
        const did = { authenticated: true, id: 'did:3:123' }
        const client = new WebClient({ ceramic: 'local' })
        client._ceramic = { did } as unknown as CeramicClient
        const self = new SelfID({ client })
        expect(self.did).toBe(did)
      })
    })

    test('id', () => {
      const client = new WebClient({ ceramic: 'local' })
      client._ceramic = {
        did: { authenticated: true, id: 'did:3:123' },
      } as unknown as CeramicClient
      const self = new SelfID({ client })
      expect(self.id).toBe('did:3:123')
    })
  })

  describe('get()', () => {
    test('calls dataStore.get()', async () => {
      const get = jest.fn(() => Promise.resolve({ name: 'Bob' }))
      const client = new WebClient({ ceramic: 'local' })
      client._ceramic = {
        did: { authenticated: true, id: 'did:3:123' },
      } as unknown as CeramicClient
      client._dataStore = { get } as unknown as DIDDataStore
      const self = new SelfID({ client })
      await expect(self.get('basicProfile')).resolves.toEqual({ name: 'Bob' })
      expect(get).toBeCalledWith('basicProfile', 'did:3:123')
    })
  })

  describe('set()', () => {
    test('calls dataStore.set()', async () => {
      const set = jest.fn(() => 'streamID')
      const client = new WebClient({ ceramic: 'local' })
      client._ceramic = { did: { authenticated: true } } as unknown as CeramicClient
      client._dataStore = { set } as unknown as DIDDataStore
      const self = new SelfID({ client })
      await expect(self.set('basicProfile', { name: 'Bob' })).resolves.toBe('streamID')
      expect(set).toBeCalledWith('basicProfile', { name: 'Bob' })
    })
  })
})
