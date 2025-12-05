// Lambda utilities
export { getServiceName, setServiceName } from "./lambda/service-name"

// REST API utilities
export { ApiConfig, getApiConfigFromSecret } from "./rest-api/api-config"
export { AbstractRestApiService } from "./rest-api/rest-api-service"

// Test fixtures
export {
  createAxiosResponseFixture,
  createAxiosErrorFixture,
} from "./test/fixtures/axios.fixture"
export { createEventBridgeFixture } from "./test/fixtures/eventbridge.fixture"

// Test mocks
export { mockGetApiConfigFromSecret } from "./test/rest-api/api-config.mock"

// Utility functions
export { axiosErrorStatus, prettyAxiosError } from "./utils/axios"
export { env, envAsInteger } from "./utils/env"
export { logStreamData } from "./utils/log-stream-data"
export { logger } from "./utils/logger"
export {
  isFulfilled,
  isRejected,
  getFulfilledValues,
  getRejectedReasons,
} from "./utils/promise-helpers"
export { tryCatch } from "./utils/try-catch"
