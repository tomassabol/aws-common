/**
 * Check that result of Promise.allSettled is fulfilled
 */

export function isFulfilled<T>(
  promiseSettledResult: PromiseSettledResult<T>
): promiseSettledResult is PromiseFulfilledResult<T> {
  return promiseSettledResult.status === "fulfilled"
}

/**
 * Check that result of Promise.allSettled is rejected
 */

export function isRejected<T>(
  promiseSettledResult: PromiseSettledResult<T>
): promiseSettledResult is PromiseRejectedResult {
  return promiseSettledResult.status === "rejected"
}

/**
 * Filter and map Promise.allSettled result to an array of resolved values.
 */

export function getFulfilledValues<T>(
  promiseSettledResults: PromiseSettledResult<T>[]
): T[] {
  return promiseSettledResults.filter(isFulfilled).map((item) => item.value)
}

/**
 * Filter and map Promise.allSettled result to an array of rejected values.
 */

export function getRejectedReasons<T>(
  promiseSettledResults: PromiseSettledResult<T>[]
): unknown[] {
  return promiseSettledResults.filter(isRejected).map((item) => item.reason)
}
