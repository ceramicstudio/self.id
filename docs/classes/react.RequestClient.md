# Class: RequestClient<ModelTypes, Alias\>

[react](../modules/react.md).RequestClient

The RequestClient extends the [`Core`](core.Core.md) class as a server-side client for
prefetching and serializing records so they can be hydrated on the browser side.

It is exported by the [`react`](../modules/react.md) module.

```sh
import { RequestClient } from '@self.id/react'
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases` = `CoreModelTypes` |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``] = keyof `ModelTypes`[``"definitions"``] |

## Hierarchy

- `Core`<`ModelTypes`\>

  ↳ **`RequestClient`**

## Constructors

### constructor

• **new RequestClient**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypeAliases`<`Record`<`string`, `any`\>, `Record`<`string`, `string`\>, `Record`<`string`, `string`\>\> = `ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol` = keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`RequestClientParams`](../modules/react.md#requestclientparams)<`ModelTypes`\> |

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

___

### viewerID

• `get` **viewerID**(): ``null`` \| `string`

Viewer ID associated to the request, if found in cookie string.

#### Returns

``null`` \| `string`

## Methods

### get

▸ **get**<`Key`, `ContentType`\>(`key`, `id`): `Promise`<``null`` \| `ContentType`\>

Load the record content for a given definition alias and account.

Uses [`toDID`](react.RequestClient.md#todid) to resolve the account.

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

### getState

▸ **getState**(): [`RequestState`](../modules/react.md#requeststate)

Return a serialized request state possibly containing the current viewer ID and prefetched
records so they can be injected on the browser side, notably in the [`Provider`](../modules/react.md#provider).

#### Returns

[`RequestState`](../modules/react.md#requeststate)

___

### prefetch

▸ **prefetch**<`Key`\>(`key`, `id?`): `Promise`<`boolean`\>

Prefetch loading a record so it can be exported using [`getState`](react.RequestClient.md#getstate).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |
| `id` | ``null`` \| `string` |

#### Returns

`Promise`<`boolean`\>

___

### toDID

▸ **toDID**(`accountOrDID`): `Promise`<`string`\>

Turn a DID or CAIP-10 string into a DID string.

If the input is a DID string, it will be returned as-is, otherwise
[`getAccountDID`](react.RequestClient.md#getaccountdid) will be used.

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountOrDID` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Core.toDID
