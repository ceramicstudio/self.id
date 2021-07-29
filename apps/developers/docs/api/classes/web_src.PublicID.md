---
id: "web_src.PublicID"
title: "Class: PublicID"
sidebar_label: "PublicID"
custom_edit_url: null
---

[web/src](../modules/web_src.md).PublicID

## Implements

- [`Identifyable`](../modules/web_src.md#identifyable)

## Constructors

### constructor

• **new PublicID**(`core`, `id`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `core` | [`Core`](web_src.Core.md) |
| `id` | `string` |

#### Defined in

self.id/packages/universal/dist/public.d.ts:5

## Accessors

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

self.id/packages/universal/dist/public.d.ts:6

## Methods

### getAlsoKnownAs

▸ **getAlsoKnownAs**(): `Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/universal_src.AlsoKnownAs.md)\>

#### Returns

`Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/universal_src.AlsoKnownAs.md)\>

#### Defined in

self.id/packages/universal/dist/public.d.ts:7

___

### getProfile

▸ **getProfile**(): `Promise`<``null`` \| [`BasicProfile`](../interfaces/universal_src.BasicProfile.md)\>

#### Returns

`Promise`<``null`` \| [`BasicProfile`](../interfaces/universal_src.BasicProfile.md)\>

#### Implementation of

Identifyable.getProfile

#### Defined in

self.id/packages/universal/dist/public.d.ts:9

___

### getSocialAccounts

▸ **getSocialAccounts**(): `Promise`<[`AlsoKnownAsAccount`](../interfaces/universal_src.AlsoKnownAsAccount.md)[]\>

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/universal_src.AlsoKnownAsAccount.md)[]\>

#### Implementation of

Identifyable.getSocialAccounts

#### Defined in

self.id/packages/universal/dist/public.d.ts:8
