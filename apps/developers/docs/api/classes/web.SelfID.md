---
id: "web.SelfID"
title: "Class: SelfID<ModelTypes, Alias>"
sidebar_label: "SelfID"
custom_edit_url: null
---

[web](../modules/web.md).SelfID

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``]keyof `ModelTypes`[``"definitions"``] |

## Methods

### authenticate

▸ `Static` **authenticate**<`ModelTypes`\>(`params`): `Promise`<[`SelfID`](web.SelfID.md)<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`AuthenticateParams`](../modules/web.md#authenticateparams)<`ModelTypes`\> |

#### Returns

`Promise`<[`SelfID`](web.SelfID.md)<`ModelTypes`, ``"alsoKnownAs"`` \| ``"basicProfile"``\>\>

#### Defined in

[self.id/packages/web/src/self.ts:22](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/web/src/self.ts#L22)

___

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

[self.id/packages/web/src/self.ts:52](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/web/src/self.ts#L52)

___

### set

▸ **set**<`Key`, `ContentType`\>(`key`, `content`): `Promise`<`StreamID`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Key` |
| `content` | `ContentType` |

#### Returns

`Promise`<`StreamID`\>

#### Defined in

[self.id/packages/web/src/self.ts:58](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/web/src/self.ts#L58)

## Constructors

### constructor

• **new SelfID**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `ModelTypes``ModelTypes` |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SelfIDParams`](../modules/web.md#selfidparams) |

#### Defined in

[self.id/packages/web/src/self.ts:32](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/web/src/self.ts#L32)

## Accessors

### client

• `get` **client**(): [`WebClient`](web.WebClient.md)<`ModelTypes`\>

#### Returns

[`WebClient`](web.WebClient.md)<`ModelTypes`\>

#### Defined in

[self.id/packages/web/src/self.ts:42](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/web/src/self.ts#L42)

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[self.id/packages/web/src/self.ts:46](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/web/src/self.ts#L46)
