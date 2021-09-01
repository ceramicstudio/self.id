import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { DID } from 'dids'

import { WebClient } from '..'

const Connect = ThreeIdConnect as jest.Mock<ThreeIdConnect>
const ID = DID as jest.Mock<DID>

jest.mock('@3id/connect')
jest.mock('dids')

describe('WebClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    test('uses connectNetwork param if provided', () => {
      new WebClient({ ceramic: 'local', connectNetwork: 'testnet-clay' })
      expect(ThreeIdConnect).toBeCalledWith('testnet-clay')
    })

    test('uses ceramic param if connectNetwork is not provided', () => {
      new WebClient({ ceramic: 'local' })
      expect(ThreeIdConnect).toBeCalledWith('local')
    })
  })

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
      Connect.mockImplementationOnce(
        () => ({ connect, getDidProvider } as unknown as ThreeIdConnect)
      )

      const client = new WebClient({ ceramic: 'local' })
      const authProvider = new EthereumAuthProvider({}, '0x123456')
      const did = await client.authenticate(authProvider)

      expect(did).toBeInstanceOf(DID)
      expect(connect).toBeCalledWith(authProvider)
      expect(getDidProvider).toBeCalled()
    })
  })

  describe('authenticate()', () => {
    test('calls connect() and did.authenticate()', async () => {
      const authenticate = jest.fn(() => Promise.resolve({}))
      const DIDInstance = { authenticate } as unknown as DID
      ID.mockImplementationOnce(() => DIDInstance)

      const client = new WebClient({ ceramic: 'local' })
      const authProvider = new EthereumAuthProvider({}, '0x123456')
      const did = await client.authenticate(authProvider)

      expect(did).toBe(DIDInstance)
      expect(authenticate).toBeCalled()
      expect(client.ceramic.did).toBeUndefined()
    })

    test('optionally attaches the DID to the Ceramic instance', async () => {
      const client = new WebClient({ ceramic: 'local' })
      const authProvider = new EthereumAuthProvider({}, '0x123456')
      const did = await client.authenticate(authProvider, true)
      expect(client.ceramic.did).toBe(did)
    })
  })
})
