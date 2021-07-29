---
id: "web_src.WebClient"
title: "Class: WebClient"
sidebar_label: "WebClient"
custom_edit_url: null
---

[web/src](../modules/web_src.md).WebClient

## Hierarchy

- [`Core`](web_src.Core.md)

  ↳ **`WebClient`**

## Constructors

### constructor

• **new WebClient**(`network`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](../modules/web_src.md#appnetwork) |

#### Overrides

[Core](web_src.Core.md).[constructor](web_src.Core.md#constructor)

#### Defined in

[self.id/packages/web/src/clients.ts:10](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/clients.ts#L10)

## Accessors

### ceramic

• `get` **ceramic**(): `default`

#### Returns

`default`

#### Defined in

self.id/packages/universal/dist/core.d.ts:11

___

### config

• `get` **config**(): [`ConfigURLs`](../modules/web_src.md#configurls)

#### Returns

[`ConfigURLs`](../modules/web_src.md#configurls)

#### Defined in

self.id/packages/universal/dist/core.d.ts:12

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Defined in

self.id/packages/universal/dist/core.d.ts:13

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>

#### Returns

`DIDDataStore`<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>

#### Defined in

self.id/packages/universal/dist/core.d.ts:14

___

### resolver

• `get` **resolver**(): `Resolver`

#### Returns

`Resolver`

#### Defined in

self.id/packages/universal/dist/core.d.ts:15

___

### threeId

• `get` **threeId**(): `ThreeIdConnect`

#### Returns

`ThreeIdConnect`

#### Defined in

[self.id/packages/web/src/clients.ts:15](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/clients.ts#L15)

## Methods

### authenticate

▸ **authenticate**(`authProvider`, `attachToCeramic?`): `Promise`<`DID`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `authProvider` | [`EthereumAuthProvider`](web_src.EthereumAuthProvider.md) | `undefined` |
| `attachToCeramic` | `boolean` | `false` |

#### Returns

`Promise`<`DID`\>

#### Defined in

[self.id/packages/web/src/clients.ts:19](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/clients.ts#L19)

___

### connect

▸ **connect**(`authProvider`): `Promise`<`DID`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `authProvider` | [`EthereumAuthProvider`](web_src.EthereumAuthProvider.md) |

#### Returns

`Promise`<`DID`\>

#### Defined in

[self.id/packages/web/src/clients.ts:28](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/web/src/clients.ts#L28)

___

### getAccountDID

▸ **getAccountDID**(`account`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[Core](web_src.Core.md).[getAccountDID](web_src.Core.md#getaccountdid)

#### Defined in

self.id/packages/universal/dist/core.d.ts:16

___

### getAlsoKnownAs

▸ **getAlsoKnownAs**(`id`): `Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/universal_src.AlsoKnownAs.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/universal_src.AlsoKnownAs.md)\>

#### Inherited from

[Core](web_src.Core.md).[getAlsoKnownAs](web_src.Core.md#getalsoknownas)

#### Defined in

self.id/packages/universal/dist/core.d.ts:18

___

### getProfile

▸ **getProfile**(`id`): `Promise`<``null`` \| [`BasicProfile`](../interfaces/universal_src.BasicProfile.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<``null`` \| [`BasicProfile`](../interfaces/universal_src.BasicProfile.md)\>

#### Inherited from

[Core](web_src.Core.md).[getProfile](web_src.Core.md#getprofile)

#### Defined in

self.id/packages/universal/dist/core.d.ts:19

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

[Core](web_src.Core.md).[toDID](web_src.Core.md#todid)

#### Defined in

self.id/packages/universal/dist/core.d.ts:17
