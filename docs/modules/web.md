# Module: web

Web-only APIs

```sh
npm install @self.id/web
```

## Classes

- [SelfID](../classes/web.SelfID.md)
- [WebClient](../classes/web.WebClient.md)

## Type aliases

### AuthenticateParams

Ƭ **AuthenticateParams**<`ModelTypes`\>: [`WebClientParams`](web.md#webclientparams)<`ModelTypes`\> & { `authProvider`: `EthereumAuthProvider`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |

___

### ConnectNetwork

Ƭ **ConnectNetwork**: ``"dev-unstable"`` \| ``"mainnet"`` \| ``"testnet-clay"``

___

### SelfIDParams

Ƭ **SelfIDParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client` | [`WebClient`](../classes/web.WebClient.md) |

___

### WebClientParams

Ƭ **WebClientParams**<`ModelTypes`\>: `CoreParams`<`ModelTypes`\> & { `connectNetwork?`: [`ConnectNetwork`](web.md#connectnetwork)  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ModelTypes` | extends `CoreModelTypes``CoreModelTypes` |
