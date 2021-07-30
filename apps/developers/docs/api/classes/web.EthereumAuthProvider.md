---
id: "web.EthereumAuthProvider"
title: "Class: EthereumAuthProvider"
sidebar_label: "EthereumAuthProvider"
custom_edit_url: null
---

[web](../modules/web.md).EthereumAuthProvider

## Implements

- `AuthProvider`

## Constructors

### constructor

• **new EthereumAuthProvider**(`provider`, `address`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `any` |
| `address` | `string` |
| `opts?` | `EthProviderOpts` |

#### Defined in

self.id/node_modules/@ceramicnetwork/blockchain-utils-linking/lib/ethereum.d.ts:12

## Properties

### isAuthProvider

• `Readonly` **isAuthProvider**: ``true``

#### Implementation of

AuthProvider.isAuthProvider

#### Defined in

self.id/node_modules/@ceramicnetwork/blockchain-utils-linking/lib/ethereum.d.ts:11

## Methods

### accountId

▸ **accountId**(): `Promise`<`AccountID`\>

#### Returns

`Promise`<`AccountID`\>

#### Implementation of

AuthProvider.accountId

#### Defined in

self.id/node_modules/@ceramicnetwork/blockchain-utils-linking/lib/ethereum.d.ts:13

___

### authenticate

▸ **authenticate**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

AuthProvider.authenticate

#### Defined in

self.id/node_modules/@ceramicnetwork/blockchain-utils-linking/lib/ethereum.d.ts:14

___

### createLink

▸ **createLink**(`did`): `Promise`<`LinkProof`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`LinkProof`\>

#### Implementation of

AuthProvider.createLink

#### Defined in

self.id/node_modules/@ceramicnetwork/blockchain-utils-linking/lib/ethereum.d.ts:15

___

### withAddress

▸ **withAddress**(`address`): `AuthProvider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`AuthProvider`

#### Implementation of

AuthProvider.withAddress

#### Defined in

self.id/node_modules/@ceramicnetwork/blockchain-utils-linking/lib/ethereum.d.ts:16
