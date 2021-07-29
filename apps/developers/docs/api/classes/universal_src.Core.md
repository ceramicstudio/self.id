---
id: "universal_src.Core"
title: "Class: Core"
sidebar_label: "Core"
custom_edit_url: null
---

[universal/src](../modules/universal_src.md).Core

## Constructors

### constructor

• **new Core**(`network`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](../modules/universal_src.md#appnetwork) |

#### Defined in

[self.id/packages/universal/src/core.ts:30](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L30)

## Accessors

### ceramic

• `get` **ceramic**(): `default`

#### Returns

`default`

#### Defined in

[self.id/packages/universal/src/core.ts:45](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L45)

___

### config

• `get` **config**(): [`ConfigURLs`](../modules/universal_src.md#configurls)

#### Returns

[`ConfigURLs`](../modules/universal_src.md#configurls)

#### Defined in

[self.id/packages/universal/src/core.ts:49](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L49)

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Defined in

[self.id/packages/universal/src/core.ts:53](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L53)

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>

#### Returns

`DIDDataStore`<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>

#### Defined in

[self.id/packages/universal/src/core.ts:57](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L57)

___

### resolver

• `get` **resolver**(): `Resolver`

#### Returns

`Resolver`

#### Defined in

[self.id/packages/universal/src/core.ts:61](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L61)

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

[self.id/packages/universal/src/core.ts:65](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L65)

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

[self.id/packages/universal/src/core.ts:77](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L77)

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

[self.id/packages/universal/src/core.ts:87](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L87)

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

[self.id/packages/universal/src/core.ts:73](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/core.ts#L73)
