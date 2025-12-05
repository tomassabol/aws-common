import { logger } from "../utils/logger"

let service = "unnamed service"

/**
 * Get service name set globally from the lambda handler
 */

export function getServiceName(): string {
  return service
}

/**
 * Set global service name (to be used in lambda handler)
 */

export function setServiceName(serviceName: string) {
  service = serviceName
  logger.appendKeys({ service })
}
