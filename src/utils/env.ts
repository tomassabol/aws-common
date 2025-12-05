import { logger } from "./logger"

export function env(name: string): string {
  const value = process.env[name]

  if (value === undefined) {
    const message = `Invalid environment variable "${name}"`
    logger.error(message)
    throw new Error(message)
  }

  return value
}

/**
 * Get environment variable and convert it to integer
 */

export function envAsInteger(name: string): number
export function envAsInteger(
  name: string,
  options: { optional?: true; min?: number; max?: number }
): number | undefined
export function envAsInteger(
  name: string,
  options: { optional?: boolean; min?: number; max?: number } = {}
): number | undefined {
  const value = process.env[name]

  if (value === undefined) {
    if (options.optional) return undefined
    const message = `Invalid environment variable "${name}"`
    logger.error(message)
    throw new Error(message)
  }

  const result = parseInt(value)

  if (!isFinite(result)) {
    const message = `Environment variable "${name}" expected to be a number`
    logger.error(message)
    throw new Error(message)
  }

  if (options.optional) {
    if (options.min !== undefined && result < options.min) return undefined
    if (options.max !== undefined && result > options.max) return undefined
  }

  if (options.min !== undefined && result < options.min) {
    const message = `Environment variable "${name}" expected to be greater or equal to ${options.min}`
    logger.error(message)
    throw new Error(message)
  }
  if (options.max !== undefined && result > options.max) {
    const message = `Environment variable "${name}" expected to be less or equal to ${options.max}`
    logger.error(message)
    throw new Error(message)
  }

  return result
}
