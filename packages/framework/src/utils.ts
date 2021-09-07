export interface Deferred<T> extends Promise<T> {
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export function deferred<T>(): Deferred<T> {
  let methods
  const promise = new Promise<T>((resolve, reject): void => {
    methods = { resolve, reject }
  })
  return Object.assign(promise, methods) as Deferred<T>
}

export interface CancellablePromise<T> extends Promise<T> {
  get cancelled(): boolean
  cancel: () => void
}

export function cancellable<T>(promise: Promise<T>): CancellablePromise<T> {
  const controller = new AbortController()
  return Object.assign(promise, {
    cancel: () => controller.abort(),
    cancelled: controller.signal.aborted,
  })
}
