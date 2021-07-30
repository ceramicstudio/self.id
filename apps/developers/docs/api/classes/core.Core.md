---
id: "core.Core"
title: "Class: Core"
sidebar_label: "Core"
custom_edit_url: null
---

[core](../modules/core.md).Core

## Constructors

### constructor

• **new Core**(`network`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | [`AppNetwork`](../modules/core.md#appnetwork) |

#### Defined in

[self.id/packages/core/src/core.ts:23](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L23)

## Accessors

### ceramic

• `get` **ceramic**(): `default`

#### Returns

`default`

#### Defined in

[self.id/packages/core/src/core.ts:38](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L38)

___

### config

• `get` **config**(): [`ConfigURLs`](../modules/core.md#configurls)

#### Returns

[`ConfigURLs`](../modules/core.md#configurls)

#### Defined in

[self.id/packages/core/src/core.ts:42](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L42)

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Defined in

[self.id/packages/core/src/core.ts:46](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L46)

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>

#### Returns

`DIDDataStore`<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>

#### Defined in

[self.id/packages/core/src/core.ts:50](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L50)

___

### resolver

• `get` **resolver**(): `Resolver`

#### Returns

`Resolver`

#### Defined in

[self.id/packages/core/src/core.ts:54](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L54)

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

[self.id/packages/core/src/core.ts:58](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L58)

___

### getAlsoKnownAs

▸ **getAlsoKnownAs**(`id`): `Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/core.AlsoKnownAs.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/core.AlsoKnownAs.md)\>

#### Defined in

[self.id/packages/core/src/core.ts:70](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L70)

___

### getProfile

▸ **getProfile**(`id`): `Promise`<``null`` \| [`BasicProfile`](../interfaces/core.BasicProfile.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<``null`` \| [`BasicProfile`](../interfaces/core.BasicProfile.md)\>

#### Defined in

[self.id/packages/core/src/core.ts:80](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L80)

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

[self.id/packages/core/src/core.ts:66](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/core.ts#L66)
