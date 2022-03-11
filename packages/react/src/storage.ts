import { getCookieValue } from './utils.js'

/** @internal */
export const canUseBrowserCookie = typeof document !== 'undefined' && 'cookie' in document

/** @internal */
export function getBrowserCookie(name: string, fallback?: string): string | undefined {
  return canUseBrowserCookie ? getCookieValue(document.cookie, name, fallback) : fallback
}

/** @internal */
export type SetCookieOptions = {
  maxAge?: number
  path?: string
}

/** @internal */
export function setBrowserCookie(
  name: string,
  value: string,
  options: SetCookieOptions = {}
): boolean {
  if (!canUseBrowserCookie) {
    return false
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${
    options.maxAge ?? 2592000 // 30 day
  }; path=${options.path ?? '/'}; SameSite=Strict`
  return true
}

/** @internal */
export function deleteBrowserCookie(name: string, path = '/'): boolean {
  if (!canUseBrowserCookie) {
    return false
  }
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; SameSite=Strict`
  return true
}

/**
 * Implements Jotai's Storage interface
 *
 * @internal
 */
export const CookieStorage = {
  getItem: (key: string): string | null => getBrowserCookie(key) ?? null,
  setItem: (key: string, value: string | null): void => {
    if (value == null) {
      deleteBrowserCookie(key)
    } else {
      setBrowserCookie(key, value)
    }
  },
  removeItem: (key: string): void => {
    deleteBrowserCookie(key)
  },
}
