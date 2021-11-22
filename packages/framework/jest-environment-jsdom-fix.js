const Environment = require('jest-environment-jsdom')

module.exports = class TestEnvironment extends Environment {
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
