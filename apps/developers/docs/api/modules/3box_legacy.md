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

#### Defined in

[self.id/packages/3box-legacy/src/index.ts:14](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/3box-legacy/src/index.ts#L14)

___

### transformProfile

▸ `Const` **transformProfile**(`profile`): `BasicProfile`

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | `Record`<`string`, `any`\> |

#### Returns

`BasicProfile`

#### Defined in

[self.id/packages/3box-legacy/src/index.ts:41](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/3box-legacy/src/index.ts#L41)

___

### getLegacy3BoxProfileAsBasicProfile

▸ **getLegacy3BoxProfileAsBasicProfile**(`address`): `Promise`<`BasicProfile` \| ``null``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`BasicProfile` \| ``null``\>

#### Defined in

[self.id/packages/3box-legacy/src/index.ts:82](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/3box-legacy/src/index.ts#L82)
