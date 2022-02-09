import Environment from 'jest-environment-jsdom'

export default class TestEnvironment extends Environment {
  async setup() {
    await super.setup()
    if (typeof this.global.TextDecoder === 'undefined') {
      this.global.TextDecoder = TextDecoder
    }
    if (typeof this.global.TextEncoder === 'undefined') {
      this.global.TextEncoder = TextEncoder
    }
  }
}
