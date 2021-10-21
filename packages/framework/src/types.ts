import type { SelfID } from '@self.id/web'

export type ConnectionState =
  | { status: 'disconnected' }
  | { status: 'connecting' }
  | { status: 'connected'; selfID: SelfID }
  | { status: 'failed'; error?: Error }
