---
id: "universal_src.PublicID"
title: "Class: PublicID"
sidebar_label: "PublicID"
custom_edit_url: null
---

[universal/src](../modules/universal_src.md).PublicID

## Implements

- [`Identifyable`](../modules/universal_src.md#identifyable)

## Constructors

### constructor

• **new PublicID**(`core`, `id`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `core` | [`Core`](universal_src.Core.md) |
| `id` | `string` |

#### Defined in

[self.id/packages/universal/src/public.ts:8](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/public.ts#L8)

## Accessors

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[self.id/packages/universal/src/public.ts:13](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/public.ts#L13)

## Methods

### getAlsoKnownAs

▸ **getAlsoKnownAs**(): `Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/universal_src.AlsoKnownAs.md)\>

#### Returns

`Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/universal_src.AlsoKnownAs.md)\>

#### Defined in

[self.id/packages/universal/src/public.ts:17](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/public.ts#L17)

___

### getProfile

▸ **getProfile**(): `Promise`<``null`` \| [`BasicProfile`](../interfaces/universal_src.BasicProfile.md)\>

#### Returns

`Promise`<``null`` \| [`BasicProfile`](../interfaces/universal_src.BasicProfile.md)\>

#### Implementation of

Identifyable.getProfile

#### Defined in

[self.id/packages/universal/src/public.ts:26](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/public.ts#L26)

___

### getSocialAccounts

▸ **getSocialAccounts**(): `Promise`<[`AlsoKnownAsAccount`](../interfaces/universal_src.AlsoKnownAsAccount.md)[]\>

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/universal_src.AlsoKnownAsAccount.md)[]\>

#### Implementation of

Identifyable.getSocialAccounts

#### Defined in

[self.id/packages/universal/src/public.ts:21](https://github.com/ceramicstudio/self.id/blob/ba95ea3/packages/universal/src/public.ts#L21)
