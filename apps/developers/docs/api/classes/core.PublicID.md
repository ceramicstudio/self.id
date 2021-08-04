---
id: "core.PublicID"
title: "Class: PublicID<ModelTypes, Alias>"
sidebar_label: "PublicID"
custom_edit_url: null
---

[core](../modules/core.md).PublicID

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](../modules/core.md#coremodeltypes)[`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``]keyof `ModelTypes`[``"definitions"``] |

## Constructors

### constructor

• **new PublicID**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](../modules/core.md#coremodeltypes)[`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`PublicIDParams`](../modules/core.md#publicidparams)<`ModelTypes`\> |

#### Defined in

[self.id/packages/core/src/public.ts:18](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/public.ts#L18)

## Accessors

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[self.id/packages/core/src/public.ts:23](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/public.ts#L23)

## Methods

### get

▸ **get**<`Key`, `ContentType`\>(`key`): `Promise`<``null`` \| `ContentType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |

#### Returns

`Promise`<``null`` \| `ContentType`\>

#### Defined in

[self.id/packages/core/src/public.ts:27](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/public.ts#L27)
