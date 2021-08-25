---
id: "3box_legacy"
title: "Module: 3box-legacy"
sidebar_label: "3box-legacy"
sidebar_position: 0
custom_edit_url: null
---

3Box legacy utilities

```sh
npm install @self.id/3box-legacy
```

## Functions

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

___

### transformProfile

▸ `Const` **transformProfile**(`profile`): `BasicProfile`

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | `Record`<`string`, `any`\> |

#### Returns

`BasicProfile`

___

### getLegacy3BoxProfileAsBasicProfile

▸ **getLegacy3BoxProfileAsBasicProfile**(`address`): `Promise`<`BasicProfile` \| ``null``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`BasicProfile` \| ``null``\>
