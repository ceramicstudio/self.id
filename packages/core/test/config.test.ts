import { getConfig } from '../src'

describe('config', () => {
  test('getConfig() using a valid config name', () => {
    expect(getConfig('local-clay')).toEqual({
      ceramic: 'http://localhost:7007',
      connectNetwork: 'testnet-clay',
    })
  })

  test('getConfig() throws an error when using an invalid config name', () => {
    expect(() => getConfig('not-here' as any)).toThrow('Unsupported Ceramic network: not-here')
  })
})
