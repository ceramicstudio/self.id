# Module: core

Read public records in Node and browsers environments.

## Purpose

The `core` module of the Self.ID SDK exports the `Core` and `PublicID` classes to provide APIs
for reading public records in Node and browsers environments.

It can therefore be used both client-side and server-side by applications wanting to access
records associated to a DID on a Ceramic network.

## Installation

```sh
npm install @self.id/core
```

## Common use-cases

### Read the basic profile of a known DID

```ts
import { Core } from '@self.id/core'

const core = new Core({ ceramic: 'testnet-clay' })

async function getProfile() {
  // Replace by the wanted DID string
  const did = 'did:3:...'
  return await core.get('basicProfile', did)
}
```

### Connect to a custom Ceramic node

```ts
import { Core } from '@self.id/core'

// You can provide the URL of a custom node as the `ceramic` parameter
const core = new Core({ ceramic: 'https://ceramic-clay.3boxlabs.com' })
```

### Use a custom data model

```ts
import { Core } from '@self.id/core'

const aliases = {
  definitions: {
    basicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
    notes: 'kjzl6cwe1jw14688v7zhf5eo1uiblt0thkgdedb5gaiq99isj224g6v8uza2r4m',
  },
  schemas: {
    BasicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
    Note: 'ceramic://k3y52l7qbv1fryg3uy4gz50pj3ivni18h6younsgd2kb5u7mivx3h258m01tkwk5c',
    Notes: 'ceramic://k3y52l7qbv1frxk024s7ds2456qo3rwa02k31uf98loz8lm1lodlgv3eeqh4cxgjk',
  },
  tiles: {
    placeholderNote: 'kjzl6cwe1jw148snra9bmyf32y5pj2ysnvenqx59k7n2lz3gnri72axvp25fo1v',
  },
}
const core = new Core({ ceramic: 'testnet-clay', aliases })

async function getNotes(did) {
  return await core.get('notes', did)
}
```

### Use a PublicID instance

```ts
import { Core, PublicID } from '@self.id/core'

const core = new Core({ ceramic: 'testnet-clay' })
// Replace the `id` parameter by the wanted DID string
const currentUser = new PublicID({ core, id: 'did:3:...' })

async function getCurrentUserProfile() {
  return await currentUser.get('basicProfile')
}
```

## Classes

- [Core](../classes/core.Core.md)
- [PublicID](../classes/core.PublicID.md)

## Type aliases

### CeramicNetwork

Ƭ **CeramicNetwork**: ``"local"`` \| ``"mainnet-gateway"`` \| ``"testnet-clay"`` \| ``"testnet-clay-gateway"``

Configured Ceramic endpoints:

- "local" -> http://localhost:7007
- "mainnet-gateway" -> https://gateway.ceramic.network (read-only)
- "testnet-clay" -> https://ceramic-clay.3boxlabs.com
- "testnet-clay-gateway" -> https://gateway-clay.ceramic.network (read-only)

___

### CoreModelTypes

Ƭ **CoreModelTypes**: `ModelTypeAliases`<{ `AlsoKnownAs`: `AlsoKnownAs` ; `BasicProfile`: `BasicProfile` ; `CryptoAccounts`: `CryptoAccountLinks`  }, { `alsoKnownAs`: ``"AlsoKnownAs"`` ; `basicProfile`: ``"BasicProfile"`` ; `cryptoAccounts`: ``"CryptoAccounts"``  }\>

Default model types provided by the Self.ID SDK.

___

### CoreParams

Ƭ **CoreParams**<`ModelTypes`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = [`CoreModelTypes`](core.md#coremodeltypes) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `aliases?` | `ModelTypesToAliases`<`ModelTypes`\> | Data model aliases to use instead of the default ones. |
| `cache?` | `TileCache` \| `boolean` | Cache interface to use or `true` to use a default cache. If `false` or undefined (default), no cache is used. |
| `ceramic` | [`CeramicNetwork`](core.md#ceramicnetwork) \| `string` | Predefined [`CeramicNetwork`](core.md#ceramicnetwork) configuration value of Ceramic server URL. |
| `loader?` | `TileLoader` | Tile loader instance to use. If provided, the `cache` parameter will be ignored. |

___

### PublicIDParams

Ƭ **PublicIDParams**<`ModelTypes`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = [`CoreModelTypes`](core.md#coremodeltypes) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `core` | [`Core`](../classes/core.Core.md)<`ModelTypes`\> | [`Core`](../classes/core.Core.md) instance to use. |
| `id` | `string` | DID string. |
