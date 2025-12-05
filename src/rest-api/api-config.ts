/**
 * Schema for API url and key stored in AWS secrets manager as JSON object
 */

import { getSecretAsObject } from "@tomassabol/aws-services/secrets-manager"

export type ApiConfig = {
  baseURL: string
  apiKey: string
}

/**
 * Get API configuration from AWS secrets manager
 */

export async function getApiConfigFromSecret(
  secretName: string
): Promise<ApiConfig> {
  const { baseURL, apiKey } = await getSecretAsObject<ApiConfig>(secretName)

  if (typeof baseURL === "string" && typeof apiKey === "string") {
    return { baseURL, apiKey }
  } else {
    throw new Error(
      `Invalid value of secret ${secretName}; expected JSON object with baseURL and apiKey attributes.`
    )
  }
}
