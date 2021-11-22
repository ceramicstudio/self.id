import type { ModelTypeAliases } from '@glazed/types'
import type { CoreModelTypes } from '@self.id/core'
import type { SelfID } from '@self.id/web'

export type ConnectionState<ModelTypes extends ModelTypeAliases = CoreModelTypes> =
  | { status: 'disconnected' }
  | { status: 'connecting' }
  | { status: 'connected'; selfID: SelfID<ModelTypes> }
  | { status: 'failed'; error?: Error }
