import { getCookieValue } from './utils'

export const canUseBrowserCookie = typeof document !== 'undefined' && 'cookie' in document

export function getBrowserCookie(name: string, fallback?: string): string | undefined {
  return canUseBrowserCookie ? getCookieValue(document.cookie, name, fallback) : fallback
}

export type SetCookieOptions = {
  maxAge?: number
  path?: string
}

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

export function deleteBrowserCookie(name: string): boolean {
  if (!canUseBrowserCookie) {
    return false
  }

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  return true
}

// Implements Jotai's Storage interface
export const CookieStorage = {
  getItem: (key: string): string | null => getBrowserCookie(key) ?? null,
  setItem: (key: string, value: string | null): void => {
    if (value == null) {
      deleteBrowserCookie(key)
    } else {
      setBrowserCookie(key, value)
    }
  },
}
