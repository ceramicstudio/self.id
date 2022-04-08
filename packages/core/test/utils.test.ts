import { isCAIP10string } from '../src'

describe('isCAIP10string()', () => {
  test('returns false if input is not a valid CAIP-10 account', () => {
    // v0 format is not supported
    expect(isCAIP10string('0x123456@eip155:1')).toBe(false)
    expect(isCAIP10string('eip155:0x123456')).toBe(false)
    expect(isCAIP10string('0x123456:1')).toBe(false)
    expect(isCAIP10string('foo:random')).toBe(false)
  })

  test('returns true if input is a valid CAIP-10 account', () => {
    expect(isCAIP10string('eip155:1:0x123456')).toBe(true)
    expect(isCAIP10string('random:foo:bar')).toBe(true)
  })
})
