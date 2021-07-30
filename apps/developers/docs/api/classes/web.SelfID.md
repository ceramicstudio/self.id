---
id: "web.SelfID"
title: "Class: SelfID"
sidebar_label: "SelfID"
custom_edit_url: null
---

[web](../modules/web.md).SelfID

## Implements

- `Identifyable`

## Constructors

### constructor

• **new SelfID**(`client`, `did`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`WebClient`](web.WebClient.md) |
| `did` | `DID` |

#### Defined in

[self.id/packages/web/src/self.ts:31](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L31)

## Accessors

### client

• `get` **client**(): [`WebClient`](web.WebClient.md)

#### Returns

[`WebClient`](web.WebClient.md)

#### Defined in

[self.id/packages/web/src/self.ts:46](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L46)

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[self.id/packages/web/src/self.ts:50](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L50)

## Methods

### addGitHubAttestation

▸ **addGitHubAttestation**(`username`, `challengeCode`): `Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `challengeCode` | `string` |

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Defined in

[self.id/packages/web/src/self.ts:88](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L88)

___

### addTwitterAttestation

▸ **addTwitterAttestation**(`username`, `challengeCode`): `Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `challengeCode` | `string` |

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Defined in

[self.id/packages/web/src/self.ts:126](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L126)

___

### confirmGitHubChallenge

▸ **confirmGitHubChallenge**(`challengeCode`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `challengeCode` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/self.ts:83](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L83)

___

### confirmTwitterChallenge

▸ **confirmTwitterChallenge**(`challengeCode`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `challengeCode` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/self.ts:121](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L121)

___

### getAlsoKnownAs

▸ **getAlsoKnownAs**(): `Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/core.AlsoKnownAs.md)\>

#### Returns

`Promise`<``null`` \| [`AlsoKnownAs`](../interfaces/core.AlsoKnownAs.md)\>

#### Defined in

[self.id/packages/web/src/self.ts:56](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L56)

___

### getGitHubChallenge

▸ **getGitHubChallenge**(`username`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/self.ts:79](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L79)

___

### getProfile

▸ **getProfile**(): `Promise`<``null`` \| [`BasicProfile`](../interfaces/core.BasicProfile.md)\>

#### Returns

`Promise`<``null`` \| [`BasicProfile`](../interfaces/core.BasicProfile.md)\>

#### Implementation of

Identifyable.getProfile

#### Defined in

[self.id/packages/web/src/self.ts:69](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L69)

___

### getSocialAccounts

▸ **getSocialAccounts**(): `Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Implementation of

Identifyable.getSocialAccounts

#### Defined in

[self.id/packages/web/src/self.ts:60](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L60)

___

### getTwitterChallenge

▸ **getTwitterChallenge**(`username`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/self.ts:117](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L117)

___

### removeGitHubAccount

▸ **removeGitHubAccount**(`username`): `Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Defined in

[self.id/packages/web/src/self.ts:107](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L107)

___

### removeSocialAccount

▸ **removeSocialAccount**(`host`, `id`): `Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `host` | `undefined` \| `string` |
| `id` | `string` |

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Defined in

[self.id/packages/web/src/self.ts:155](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L155)

___

### removeTwitterAccount

▸ **removeTwitterAccount**(`username`): `Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

`Promise`<[`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[]\>

#### Defined in

[self.id/packages/web/src/self.ts:145](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L145)

___

### setAlsoKnownAsAccounts

▸ **setAlsoKnownAsAccounts**(`accounts`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `accounts` | [`AlsoKnownAsAccount`](../interfaces/core.AlsoKnownAsAccount.md)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[self.id/packages/web/src/self.ts:65](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L65)

___

### setProfile

▸ **setProfile**(`profile`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | [`BasicProfile`](../interfaces/core.BasicProfile.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[self.id/packages/web/src/self.ts:73](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L73)

___

### authenticate

▸ `Static` **authenticate**(`network`, `authProvider`): `Promise`<[`SelfID`](web.SelfID.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | `AppNetwork` |
| `authProvider` | [`EthereumAuthProvider`](web.EthereumAuthProvider.md) |

#### Returns

`Promise`<[`SelfID`](web.SelfID.md)\>

#### Defined in

[self.id/packages/web/src/self.ts:18](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/self.ts#L18)