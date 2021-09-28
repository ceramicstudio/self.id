export type Abortable<T> = Promise<T> & AbortController

export function abortable<T>(promise: Promise<T>): Abortable<T> {
  const controller = new AbortController()
  return Object.assign(promise, { abort: () => controller.abort(), signal: controller.signal })
}

export function getCookieValue(
  cookies: string,
  name: string,
  fallback?: string
): string | undefined {
  const value = cookies
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1]
  return value ? decodeURIComponent(value) : fallback
}
