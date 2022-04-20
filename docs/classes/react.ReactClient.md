# Class: ReactClient<ModelTypes\>

[react](../modules/react.md).ReactClient

ReactClient extends the [`Core class`](core.Core.md) with authentication support in browser
environments.

It is exported by the [`react`](../modules/react.md) module.

```sh
import { ReactClient } from '@self.id/react'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |

## Hierarchy

- `Core`<`ModelTypes`\>

  ↳ **`ReactClient`**

## Constructors

### constructor

• **new ReactClient**<`ModelTypes`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `WebClientParams`<`ModelTypes`\> |

#### Overrides

Core&lt;ModelTypes\&gt;.constructor

## Accessors

### ceramic

• `get` **ceramic**(): `CeramicClient`

Ceramic HTTP Client instance used internally.

#### Returns

`CeramicClient`

#### Inherited from

Core.ceramic

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

DataModel runtime instance used internally.

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Inherited from

Core.dataModel

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

DID DataStore instance used internally.

#### Returns

`DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

#### Inherited from

Core.dataStore

___

### resolver

• `get` **resolver**(): `Resolver`

DID resolver instance used internally.

#### Returns

`Resolver`

#### Inherited from

Core.resolver

___

### tileLoader

• `get` **tileLoader**(): `TileLoader`

Tile loader instance used internally.

#### Returns

`TileLoader`

#### Inherited from

Core.tileLoader

## Methods

### authenticate

▸ **authenticate**(`authProvider`): `Promise`<`SelfID`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>\>

Create a [`SelfID`](web.SelfID.md) instance using the given `authProvider` and attach the
associated DID instance to the internal Ceramic client instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProvider` | `EthereumAuthProvider` |

#### Returns

`Promise`<`SelfID`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>\>

___

### get

▸ **get**<`Key`, `ContentType`\>(`key`, `id`): `Promise`<``null`` \| `ContentType`\>

Load the record content for a given definition alias and account.

Uses [`toDID`](react.ReactClient.md#todid) to resolve the account.

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

#### Inherited from

Core.get

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

#### Inherited from

Core.getAccountDID

___

### toDID

▸ **toDID**(`accountOrDID`): `Promise`<`string`\>

Turn a DID or CAIP-10 string into a DID string.

If the input is a DID string, it will be returned as-is, otherwise
[`getAccountDID`](react.ReactClient.md#getaccountdid) will be used.

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountOrDID` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Core.toDID
