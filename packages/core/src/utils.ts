import { AccountId } from 'caip'

export { isDIDstring } from '@glazed/did-datastore'

/** @internal */
export function isCAIP10string(account: string): boolean {
  try {
    AccountId.parse(account)
    return true
  } catch (e) {
    return false
  }
}
