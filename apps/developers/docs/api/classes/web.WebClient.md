---
id: "web.WebClient"
title: "Class: WebClient<ModelTypes>"
sidebar_label: "WebClient"
custom_edit_url: null
---

[web](../modules/web.md).WebClient

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |

## Hierarchy

- `Core`<`ModelTypes`\>

  ↳ **`WebClient`**

## Constructors

### constructor

• **new WebClient**<`ModelTypes`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `CoreParams`<`ModelTypes`\> |

#### Overrides

Core&lt;ModelTypes\&gt;.constructor

#### Defined in

self.id/packages/web/src/client.ts:10

## Accessors

### ceramic

• `get` **ceramic**(): `default`

#### Returns

`default`

#### Defined in

self.id/packages/core/dist/core.d.ts:14

___

### config

• `get` **config**(): `ConfigURLs`

#### Returns

`ConfigURLs`

#### Defined in

self.id/packages/core/dist/core.d.ts:15

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Defined in

self.id/packages/core/dist/core.d.ts:16

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

#### Returns

`DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

#### Defined in

self.id/packages/core/dist/core.d.ts:17

___

### resolver

• `get` **resolver**(): `Resolver`

#### Returns

`Resolver`

#### Defined in

self.id/packages/core/dist/core.d.ts:18

___

### threeId

• `get` **threeId**(): `ThreeIdConnect`

#### Returns

`ThreeIdConnect`

#### Defined in

self.id/packages/web/src/client.ts:15

## Methods

### getAccountDID

▸ **getAccountDID**(`account`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Core.getAccountDID

#### Defined in

self.id/packages/core/dist/core.d.ts:19

___

### toDID

▸ **toDID**(`accountOrDID`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accountOrDID` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Core.toDID

#### Defined in

self.id/packages/core/dist/core.d.ts:20

___

### get

▸ **get**<`Key`, `ContentType`\>(`id`, `key`): `Promise`<``null`` \| `ContentType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `key` | `Key` |

#### Returns

`Promise`<``null`` \| `ContentType`\>

#### Inherited from

Core.get

#### Defined in

self.id/packages/core/dist/core.d.ts:21

___

### authenticate

▸ **authenticate**(`authProvider`, `attachToCeramic?`): `Promise`<`DID`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `authProvider` | [`EthereumAuthProvider`](web.EthereumAuthProvider.md) | `undefined` |
| `attachToCeramic` | `boolean` | `false` |

#### Returns

`Promise`<`DID`\>

#### Defined in

self.id/packages/web/src/client.ts:19

___

### connect

▸ **connect**(`authProvider`): `Promise`<`DID`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProvider` | [`EthereumAuthProvider`](web.EthereumAuthProvider.md) |

#### Returns

`Promise`<`DID`\>

#### Defined in

self.id/packages/web/src/client.ts:28
