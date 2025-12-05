import { isAxiosError } from "axios"

/**
 * Get HTTP status code from Axios error
 */

export function axiosErrorStatus(error: unknown): number | undefined {
  if (isAxiosError(error)) return error.response?.status
}

/**
 * Hoist HTTP response body from Axios error object for better error logging
 */

export function prettyAxiosError(error: unknown) {
  if (isAxiosError(error)) {
    const { name, code, message, config, response } = error
    const { method, baseURL, url, data: requestData, timeout } = config || {}
    const { data: responseData, status, statusText } = response || {}

    return {
      name,
      message,
      status,
      statusText,
      code,
      method,
      baseURL,
      url,
      timeout,
      requestData,
      responseData,
    }
  } else {
    return error
  }
}
