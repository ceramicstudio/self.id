# Class: Core<ModelTypes, Alias\>

[core](../modules/core.md).Core

Core client for the Self.ID SDK, exported by the [`core`](../modules/core.md) module.

```sh
import { Core } from '@self.id/core'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = [`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``] = keyof `ModelTypes`[``"definitions"``] |

## Constructors

### constructor

• **new Core**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = [`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends `string` \| `number` \| `symbol` = keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CoreParams`](../modules/core.md#coreparams)<`ModelTypes`\> |

## Accessors

### ceramic

• `get` **ceramic**(): `CeramicClient`

Ceramic HTTP Client instance used internally.

#### Returns

`CeramicClient`

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

DataModel runtime instance used internally.

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

DID DataStore instance used internally.

#### Returns

`DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

___

### resolver

• `get` **resolver**(): `Resolver`

DID resolver instance used internally.

#### Returns

`Resolver`

___

### tileLoader

• `get` **tileLoader**(): `TileLoader`

Tile loader instance used internally.

#### Returns

`TileLoader`

## Methods

### get

▸ **get**<`Key`, `ContentType`\>(`key`, `id`): `Promise`<``null`` \| `ContentType`\>

Load the record content for a given definition alias and account.

Uses [`toDID`](core.Core.md#todid) to resolve the account.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |
| `id` | `string` |

#### Returns

`Promise`<``null`` \| `ContentType`\>

___

### getAccountDID

▸ **getAccountDID**(`account`): `Promise`<`string`\>

Load the DID string for a given CAIP-10 account using a CAIP-10 link, or throw an error if
not linked.

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`string`\>

___

### toDID

▸ **toDID**(`accountOrDID`): `Promise`<`string`\>

Turn a DID or CAIP-10 string into a DID string.

If the input is a DID string, it will be returned as-is, otherwise
[`getAccountDID`](core.Core.md#getaccountdid) will be used.

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountOrDID` | `string` |

#### Returns

`Promise`<`string`\>
