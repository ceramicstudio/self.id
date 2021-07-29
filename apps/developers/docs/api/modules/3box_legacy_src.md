---
id: "3box_legacy_src"
title: "Module: 3box-legacy/src"
sidebar_label: "3box-legacy/src"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### getLegacy3BoxProfileAsBasicProfile

▸ **getLegacy3BoxProfileAsBasicProfile**(`address`): `Promise`<[`BasicProfile`](../interfaces/universal_src.BasicProfile.md) \| ``null``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<[`BasicProfile`](../interfaces/universal_src.BasicProfile.md) \| ``null``\>

#### Defined in

self.id/packages/3box-legacy/src/index.ts:72

___

### loadLegacy3BoxProfile

▸ **loadLegacy3BoxProfile**<`T`\>(`address`): `Promise`<`T` \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`T` \| ``null``\>

#### Defined in

self.id/packages/3box-legacy/src/index.ts:4

___

### transformProfile

▸ `Const` **transformProfile**(`profile`): [`BasicProfile`](../interfaces/universal_src.BasicProfile.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | `Record`<`string`, `any`\> |

#### Returns

[`BasicProfile`](../interfaces/universal_src.BasicProfile.md)

#### Defined in

self.id/packages/3box-legacy/src/index.ts:31
