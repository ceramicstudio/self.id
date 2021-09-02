# Module: 3box-legacy

3Box legacy utilities

```sh
npm install @self.id/3box-legacy
```

## Functions

### getLegacy3BoxProfileAsBasicProfile

▸ **getLegacy3BoxProfileAsBasicProfile**(`address`): `Promise`<`BasicProfile` \| ``null``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`BasicProfile` \| ``null``\>

___

### loadLegacy3BoxProfile

▸ **loadLegacy3BoxProfile**<`T`\>(`address`): `Promise`<`T` \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`string`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`T` \| ``null``\>

___

### transformProfile

▸ `Const` **transformProfile**(`profile`): `BasicProfile`

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | `Record`<`string`, `any`\> |

#### Returns

`BasicProfile`
