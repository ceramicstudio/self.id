import { AccountID } from 'caip'

export { isDIDstring } from '@glazed/did-datastore'

export function isCAIP10string(account: string): boolean {
  try {
    AccountID.parse(account)
    return true
  } catch (e) {
    return false
  }
}