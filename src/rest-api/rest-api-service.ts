import assert from "assert"

/**
 * Default timeout for HTTP requests
 *
 * NOTE!
 *
 * The timeout of lambda functions must be set higher then HTTP timeout!
 * If lambda triggered by SQS queue also the queue visibility timeout should be higher then HTTP timeout!
 */
const DEFAULT_TIMEOUT_MILLISECONDS = 9000

/**
 * Abstract class for REST API service
 */

export abstract class AbstractRestApiService {
  protected baseURL: string
  protected apiKey: string
  protected timeout: number

  constructor(
    baseURL: string,
    apiKey: string,
    options: { timeout?: number } = {}
  ) {
    this.baseURL = stripSlash(baseURL)
    this.apiKey = apiKey

    const { timeout = DEFAULT_TIMEOUT_MILLISECONDS } = options
    this.timeout = timeout
  }
}

function stripSlash(path: string) {
  assert(path && typeof path === "string", "Invalid path")
  if (path.endsWith("/")) {
    return path.substring(0, path.length - 1)
  } else {
    return path
  }
}
