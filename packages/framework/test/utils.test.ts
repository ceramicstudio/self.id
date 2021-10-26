import type { EIP1193Provider } from '@self.id/multiauth'

import { wrapEIP1193asWeb3Provider } from '../src/utils'

describe('utils', () => {
  describe('wrapEIP1193asWeb3Provider()', () => {
    test('enable() sends an "eth_requestAccounts" request', async () => {
      const request = jest.fn(() => ['0x123'])
      const provider = wrapEIP1193asWeb3Provider({ request } as unknown as EIP1193Provider)
      await expect(provider.enable()).resolves.toEqual(['0x123'])
      expect(request).toBeCalledWith({ method: 'eth_requestAccounts' })
    })

    describe('sendAsync()', () => {
      test('with successful request', (done) => {
        const request = jest.fn(() => 'OK')
        const provider = wrapEIP1193asWeb3Provider({ request } as unknown as EIP1193Provider)
        const req = { method: 'test_result', params: { foo: 'bar' } }
        provider.sendAsync(req, (err, res) => {
          expect(err).toBeUndefined()
          expect(res).toEqual({
            id: undefined,
            jsonrpc: '2.0',
            method: 'test_result',
            result: 'OK',
          })
          expect(request).toBeCalledWith(req)
          done()
        })
      })

      test('with failed request', (done) => {
        const error = new Error('Request failed')
        const request = jest.fn(() => {
          throw error
        })
        const provider = wrapEIP1193asWeb3Provider({ request } as unknown as EIP1193Provider)
        provider.sendAsync({ method: 'test_error' }, (err, res) => {
          expect(err).toBe(error)
          expect(res).toBeUndefined()
          done()
        })
      })
    })
  })
})
