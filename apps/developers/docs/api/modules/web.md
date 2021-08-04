---
id: "web"
title: "Module: web"
sidebar_label: "web"
sidebar_position: 0
custom_edit_url: null
---

Web-only APIs

```sh
npm install @self.id/web
```

## Interfaces

- [EthereumProvider](../interfaces/web.EthereumProvider.md)

## Classes

- [EthereumAuthProvider](../classes/web.EthereumAuthProvider.md)
- [WebClient](../classes/web.WebClient.md)
- [SelfID](../classes/web.SelfID.md)

## Type aliases

### AuthenticateParams

Ƭ **AuthenticateParams**<`ModelTypes`\>: `CoreParams`<`ModelTypes`\> & { `authProvider`: [`EthereumAuthProvider`](../classes/web.EthereumAuthProvider.md)  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |

#### Defined in

[self.id/packages/web/src/self.ts:9](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/web/src/self.ts#L9)

___

### SelfIDParams

Ƭ **SelfIDParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client` | [`WebClient`](../classes/web.WebClient.md) |
| `did` | `DID` |

#### Defined in

[self.id/packages/web/src/self.ts:13](https://github.com/ceramicstudio/self.id/blob/356cc44/packages/web/src/self.ts#L13)
