---
id: "core.Core"
title: "Class: Core<ModelTypes, Alias>"
sidebar_label: "Core"
custom_edit_url: null
---

[core](../modules/core.md).Core

## Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](../modules/core.md#coremodeltypes)[`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends keyof `ModelTypes`[``"definitions"``]keyof `ModelTypes`[``"definitions"``] |

## Constructors

### constructor

• **new Core**<`ModelTypes`, `Alias`\>(`params`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends [`CoreModelTypes`](../modules/core.md#coremodeltypes)[`CoreModelTypes`](../modules/core.md#coremodeltypes) |
| `Alias` | extends `string` \| `number` \| `symbol`keyof `ModelTypes`[``"definitions"``] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CoreParams`](../modules/core.md#coreparams)<`ModelTypes`\> |

#### Defined in

[self.id/packages/core/src/core.ts:30](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L30)

## Accessors

### ceramic

• `get` **ceramic**(): `default`

#### Returns

`default`

#### Defined in

[self.id/packages/core/src/core.ts:51](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L51)

___

### config

• `get` **config**(): [`ConfigURLs`](../modules/core.md#configurls)

#### Returns

[`ConfigURLs`](../modules/core.md#configurls)

#### Defined in

[self.id/packages/core/src/core.ts:55](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L55)

___

### dataModel

• `get` **dataModel**(): `DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Returns

`DataModel`<`ModelTypes`, `ModelTypesToAliases`<`ModelTypes`\>\>

#### Defined in

[self.id/packages/core/src/core.ts:59](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L59)

___

### dataStore

• `get` **dataStore**(): `DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

#### Returns

`DIDDataStore`<`ModelTypes`, keyof `ModelTypes`[``"definitions"``]\>

#### Defined in

[self.id/packages/core/src/core.ts:63](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L63)

___

### resolver

• `get` **resolver**(): `Resolver`

#### Returns

`Resolver`

#### Defined in

[self.id/packages/core/src/core.ts:67](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L67)

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

[self.id/packages/core/src/core.ts:71](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L71)

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

[self.id/packages/core/src/core.ts:79](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L79)

___

### get

▸ **get**<`Key`, `ContentType`\>(`id`, `key`): `Promise`<``null`` \| `ContentType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends `string` \| `number` \| `symbol` |
| `ContentType` | `DefinitionContentType`<`ModelTypes`, `Key`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `key` | `Key` |

#### Returns

`Promise`<``null`` \| `ContentType`\>

#### Defined in

[self.id/packages/core/src/core.ts:83](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/core/src/core.ts#L83)
