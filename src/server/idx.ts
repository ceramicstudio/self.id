import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'

import { CERAMIC_URL } from '../constants'

const ceramic = new Ceramic(CERAMIC_URL)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const idx = new IDX({ ceramic: ceramic as any })
