import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'

import { CERAMIC_URL } from '../constants'

const ceramic = new Ceramic(CERAMIC_URL)

export const idx = new IDX({ ceramic })
