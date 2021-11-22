import { abortable, getCookieValue } from '../src/utils'

describe('utils', () => {
  test('abortable', () => {
    const promise = abortable(Promise.resolve('foo'))
    promise.abort()
    expect(promise.signal.aborted).toBe(true)
  })

  describe('getCookieValue', () => {
    const cookie = 'foo=bar; bar=baz'

    test('with found value', () => {
      expect(getCookieValue(cookie, 'bar')).toBe('baz')
    })

    test('using fallback value', () => {
      expect(getCookieValue(cookie, 'test', 'fallback')).toBe('fallback')
    })
  })
})
