import * as polyfill from 'abort-controller'
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
    if (typeof this.global.AbortController === 'undefined') {
      this.global.AbortController = polyfill.AbortController
    }
    if (typeof this.global.AbortSignal === 'undefined') {
      this.global.AbortSignal = polyfill.AbortSignal
    }
  }
}
