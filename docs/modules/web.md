# Module: web

Read and write records in browsers environments.

## Purpose

The `web` module of the Self.ID SDK exports the [`WebClient`](../classes/web.WebClient.md) and
[`SelfID`](../classes/web.SelfID.md) classes to provide APIs for authenticating a DID to allow writing
records, in addition to reading them.

DID authentication leverages 3ID Connect, which only works in browsers, therefore the `web`
module can only be used in browsers. The [`core`](core.md) module can be used to read public
records in browsers as well as Node environments.

## Installation

```sh
npm install @self.id/web
```

## Common use-cases

### Authenticate and write a record

```ts
import { EthereumAuthProvider, SelfID } from '@self.id/web'

async function createSelfID() {
  // The following assumes there is an injected `window.ethereum` provider
  const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })

  return await SelfID.authenticate({
    authProvider: new EthereumAuthProvider(window.ethereum, addresses[0]),
    ceramic: 'testnet-clay',
    // Make sure the `ceramic` and `connectNetwork` parameter connect to the same network
    connectNetwork: 'testnet-clay',
  })
}

async function setBasicProfile(selfID) {
  // Use the SelfID instance created by the `createSelfID()` function
  await selfID.set('basicProfile', { name: 'Alice' })
}
```

## Re-exported classes

- `EthereumAuthProvider` from 3ID Connect

## Classes

- [SelfID](../classes/web.SelfID.md)
- [WebClient](../classes/web.WebClient.md)

## Type aliases

### AuthenticateParams

Ƭ **AuthenticateParams**<`ModelTypes`\>: [`WebClientParams`](web.md#webclientparams)<`ModelTypes`\> & { `authProvider`: `EthereumAuthProvider`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

___

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"dev-unstable"`` \| ``"mainnet"`` \| ``"testnet-clay"``

Ceramic networks supported by 3ID Connect.

___

### SelfIDParams

Ƭ **SelfIDParams**<`ModelTypes`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`WebClient`](../classes/web.WebClient.md)<`ModelTypes`\> | [`WebClient`](../classes/web.WebClient.md) instance to use. It must have an authenticated DID attached to it. |

___

### WebClientParams

Ƭ **WebClientParams**<`ModelTypes`\>: `CoreParams`<`ModelTypes`\> & { `connectNetwork?`: [`ConnectNetwork`](web.md#connectnetwork)  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |
