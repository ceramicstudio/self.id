---
id: "core.PublicID"
title: "Class: PublicID"
sidebar_label: "PublicID"
custom_edit_url: null
---

[core](../modules/core.md).PublicID

## Implements

- [`Identifyable`](../modules/core.md#identifyable)

## Constructors

### constructor

• **new PublicID**(`core`, `id`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `core` | [`Core`](core.Core.md) |
| `id` | `string` |

#### Defined in

[self.id/packages/core/src/public.ts:8](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/public.ts#L8)

## Accessors

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[self.id/packages/core/src/public.ts:13](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/public.ts#L13)

## Methods

### getAlsoKnownAs

▸ **getAlsoKnownAs**(): `Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/core.AlsoKnownAs.md)\>

#### Returns

`Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/core.AlsoKnownAs.md)\>

#### Defined in

[self.id/packages/core/src/public.ts:17](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/public.ts#L17)

___

### getProfile

▸ **getProfile**(): `Promise`<``null`` \| [`BasicProfile`](../interfaces/core.BasicProfile.md)\>

#### Returns

`Promise`<``null`` \| [`BasicProfile`](../interfaces/core.BasicProfile.md)\>

#### Implementation of

Identifyable.getProfile

#### Defined in

[self.id/packages/core/src/public.ts:26](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/public.ts#L26)

___

### getSocialAccounts

▸ **getSocialAccounts**(): `Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Implementation of

Identifyable.getSocialAccounts

#### Defined in

[self.id/packages/core/src/public.ts:21](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/core/src/public.ts#L21)
