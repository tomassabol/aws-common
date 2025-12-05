import { Logger } from "@aws-lambda-powertools/logger"

/**
 * Logger to be used either in production or in tests.
 */

const noLogger = {
  log: () => undefined,
  debug: () => undefined,
  info: () => undefined,
  error: () => undefined,
  warn: () => undefined,
  setPersistentLogAttributes: () => undefined,
  appendKeys: () => undefined,
} as unknown as Logger

export const logger =
  process.env.JEST_WORKER_ID === undefined || process.env.TEST_LOGGER
    ? new Logger({ logLevel: "DEBUG" })
    : noLogger
