import { isCAIP10string } from '..'

describe('isCAIP10string()', () => {
  test('returns false if input is not a valid CAIP-10 account', () => {
    expect(isCAIP10string('0x123456@eip155')).toBe(false)
    expect(isCAIP10string('0x123456:1')).toBe(false)
    expect(isCAIP10string('random@foo')).toBe(false)
  })

  test('returns true if input is a valid CAIP-10 account', () => {
    expect(isCAIP10string('0x123456@eip155:1')).toBe(true)
    expect(isCAIP10string('random@foo:bar')).toBe(true)
  })
})
