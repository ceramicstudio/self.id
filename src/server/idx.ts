import Ceramic from '@ceramicnetwork/ceramic-http-client'
import { IDX } from '@ceramicstudio/idx'
import { definitions } from '@ceramicstudio/idx-constants'

import { CERAMIC_URL } from '../constants'

const ceramic = new Ceramic(CERAMIC_URL)

export const idx = new IDX({ ceramic, definitions })
