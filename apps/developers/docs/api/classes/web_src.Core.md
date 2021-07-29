---
id: "web_src.Core"
title: "Class: Core"
sidebar_label: "Core"
custom_edit_url: null
---

[web/src](../modules/web_src.md).Core

## Hierarchy

- **`Core`**

  ↳ [`WebClient`](web_src.WebClient.md)

## Constructors

### constructor

• **new Core**(`network`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](../modules/web_src.md#appnetwork) |

#### Defined in

self.id/packages/universal/dist/core.d.ts:10

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

## Methods

### getAccountDID

▸ **getAccountDID**(`account`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |

#### Returns

`Promise`<`string`\>

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

#### Defined in

self.id/packages/universal/dist/core.d.ts:17
