declare module '3id-connect' {
  export class EthereumAuthProvider {
    constructor(ethProvider: unknown, address: string)
  }

  export class ThreeIdConnect {
    constructor(iframeURL?: string)
    accounts(): Promise<Record<string, Array<string>>>
  }
}
