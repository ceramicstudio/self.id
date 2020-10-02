import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { IDX } from '@ceramicstudio/idx'

import { CERAMIC_URL, IDX_DEFINITIONS, IDX_SCHEMAS } from './constants'

export const idx = new IDX({
  // @ts-ignore DID versions mismatch
  ceramic: new Ceramic(CERAMIC_URL),
  definitions: IDX_DEFINITIONS,
  schemas: IDX_SCHEMAS,
})
