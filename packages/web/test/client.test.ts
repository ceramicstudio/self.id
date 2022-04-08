/**
 * @jest-environment ./jest-environment-jsdom-fix
 */

import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { jest } from '@jest/globals'
import { DID } from 'dids'

import { WebClient } from '../src'

describe('WebClient', () => {
  describe('getters', () => {
    test('threeId', () => {
      const client = new WebClient({ ceramic: 'http://example.com' })
      expect(client.threeId).toBeInstanceOf(ThreeIdConnect)
    })
  })

  describe('connect()', () => {
    test('calls connect() on 3ID Connect instance and returns the created the DID', async () => {
      const connect = jest.fn(() => Promise.resolve())
      const getDidProvider = jest.fn(() => Promise.resolve({}))
      const client = new WebClient({ ceramic: 'local' })
      client._threeId = { connect, getDidProvider } as unknown as ThreeIdConnect
      const authProvider = new EthereumAuthProvider({}, '0x123456')
      const did = await client.connect(authProvider)
      expect(did).toBeInstanceOf(DID)
      expect(connect).toBeCalledWith(authProvider)
      expect(getDidProvider).toBeCalled()
    })
  })

  describe('authenticate()', () => {
    test('calls connect() and did.authenticate()', async () => {
      const authenticate = jest.fn(() => Promise.resolve({}))
      const DIDInstance = { authenticate } as unknown as DID
      const connect = jest.fn(() => Promise.resolve(DIDInstance))

      const client = new WebClient({ ceramic: 'local' })
      client.connect = connect
      const authProvider = new EthereumAuthProvider({}, '0x123456')
      const did = await client.authenticate(authProvider)

      expect(did).toBe(DIDInstance)
      expect(authenticate).toBeCalled()
      expect(client.ceramic.did).toBe(did)
    })

    test('does not attach the DID to the Ceramic instance', async () => {
      const authenticate = jest.fn(() => Promise.resolve({}))
      const DIDInstance = { authenticate } as unknown as DID
      const connect = jest.fn(() => Promise.resolve(DIDInstance))
      const client = new WebClient({ ceramic: 'local' })
      client.connect = connect

      const authProvider = new EthereumAuthProvider({}, '0x123456')
      await client.authenticate(authProvider, false)
      expect(client.ceramic.did).toBeUndefined()
    })
  })
})
