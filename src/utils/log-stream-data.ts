import { logger } from "./logger"

/**
 * Simplify search for stream data in logs
 */
export function logStreamData(message: string, data: unknown) {
  logger.info(message, { type: "streamData", data })
}
