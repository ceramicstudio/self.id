---
id: "web.IdentityLink"
title: "Class: IdentityLink"
sidebar_label: "IdentityLink"
custom_edit_url: null
---

[web](../modules/web.md).IdentityLink

## Constructors

### constructor

• **new IdentityLink**(`url`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Defined in

[self.id/packages/web/src/identity-link.ts:66](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/identity-link.ts#L66)

## Methods

### confirmGitHub

▸ **confirmGitHub**(`jws`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jws` | `DagJWS` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/identity-link.ts:95](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/identity-link.ts#L95)

___

### confirmTwitter

▸ **confirmTwitter**(`jws`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jws` | `DagJWS` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/identity-link.ts:108](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/identity-link.ts#L108)

___

### requestGitHub

▸ **requestGitHub**(`did`, `username`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `username` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/identity-link.ts:87](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/identity-link.ts#L87)

___

### requestTwitter

▸ **requestTwitter**(`did`, `username`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `username` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[self.id/packages/web/src/identity-link.ts:100](https://github.com/ceramicstudio/self.id/blob/136f9be/packages/web/src/identity-link.ts#L100)
