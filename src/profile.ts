import { isCaip10, isDid, getLegacy3BoxProfileAsBasicProfile } from '@ceramicstudio/idx'
import type { IDX } from '@ceramicstudio/idx'
import type { BasicProfile } from '@ceramicstudio/idx-constants'

export async function loadProfile(idx: IDX, id: string): Promise<BasicProfile | null> {
  if (isDid(id) || isCaip10(id)) {
    return (await idx.get('basicProfile', id)) ?? null
  }
  return await getLegacy3BoxProfileAsBasicProfile(id)
}
