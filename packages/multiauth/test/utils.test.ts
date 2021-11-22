import { deferred } from '../src/utils'

describe('utils', () => {
  describe('deferred()', () => {
    test('resolved', async () => {
      const promise = deferred()
      promise.resolve('foo')
      await expect(promise).resolves.toBe('foo')
    })

    test('rejected', async () => {
      const promise = deferred()
      const error = new Error()
      promise.reject(error)
      await expect(promise).rejects.toThrow(error)
    })
  })
})
