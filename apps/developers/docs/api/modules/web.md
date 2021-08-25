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

## Classes

- [WebClient](../classes/web.WebClient.md)
- [SelfID](../classes/web.SelfID.md)

## Type aliases

### WebClientParams

Ƭ **WebClientParams**<`ModelTypes`\>: `CoreParams`<`ModelTypes`\> & { `connectNetwork?`: `CeramicNetwork`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |

___

### AuthenticateParams

Ƭ **AuthenticateParams**<`ModelTypes`\>: [`WebClientParams`](web.md#webclientparams)<`ModelTypes`\> & { `authProvider`: `EthereumAuthProvider`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |

___

### SelfIDParams

Ƭ **SelfIDParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client` | [`WebClient`](../classes/web.WebClient.md) |
| `did` | `DID` |
