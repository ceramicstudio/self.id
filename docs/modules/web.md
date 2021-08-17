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

Ƭ **AuthenticateParams**<`ModelTypes`\>: `CoreParams`<`ModelTypes`\> & { `authProvider`: `EthereumAuthProvider`  }

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
