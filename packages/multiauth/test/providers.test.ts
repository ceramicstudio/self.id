import { web3ProviderRequest } from '../src/providers/utils'
import type { Web3Provider } from '../src/providers/types'

describe('providers', () => {
  describe('web3ProviderRequest() calls sendAsync() on the provider', () => {
    test('throws when receiving a callback error', async () => {
      const error = new Error()
      const sendAsync = jest.fn((_req, cb: (err: Error | null, res?: any) => void) => {
        cb(error)
      })
      await expect(
        web3ProviderRequest({ sendAsync } as unknown as Web3Provider, { method: 'foo' })
      ).rejects.toThrow(error)
    })

    test('throws when receiving a response error', async () => {
      const error = new Error()
      const sendAsync = jest.fn((_req, cb: (err: Error | null, res?: any) => void) => {
        cb(null, { error })
      })
      await expect(
        web3ProviderRequest({ sendAsync } as unknown as Web3Provider, { method: 'foo' })
      ).rejects.toThrow(error)
    })

    test('returns the result', async () => {
      const sendAsync = jest.fn((_req, cb: (err: Error | null, res?: any) => void) => {
        cb(null, { result: 'OK' })
      })
      await expect(
        web3ProviderRequest({ sendAsync } as unknown as Web3Provider, { method: 'foo' })
      ).resolves.toBe('OK')
      expect(sendAsync).toBeCalledWith({ method: 'foo' }, expect.any(Function))
    })
  })
})
