# AWS common

AWS Common Library - A collection of utilities and helpers for AWS Lambda functions and REST API services.

## Installation

```bash
npm install @tomassabol/aws-common
```

## Requirements

- Node.js >= 18.0.0
- Peer dependency: `@aws-lambda-powertools/logger` ^2.0.0

## Features

### Lambda Utilities

#### Service Name Management

Manage service names globally in Lambda handlers:

```typescript
import { setServiceName, getServiceName } from "@tomassabol/aws-common"

// Set service name in Lambda handler
setServiceName("my-service")

// Get service name
const serviceName = getServiceName() // "my-service"
```

### REST API Utilities

#### API Configuration

Retrieve API configuration from AWS Secrets Manager:

```typescript
import { getApiConfigFromSecret, ApiConfig } from "@tomassabol/aws-common"

const config: ApiConfig = await getApiConfigFromSecret("my-api-secret")
// Returns { baseURL: string, apiKey: string }
```

#### REST API Service

Abstract base class for REST API services with built-in timeout handling:

```typescript
import { AbstractRestApiService } from "@tomassabol/aws-common"

class MyApiService extends AbstractRestApiService {
  constructor(baseURL: string, apiKey: string) {
    super(baseURL, apiKey, { timeout: 9000 }) // Optional timeout in ms
  }

  // Implement your API methods here
}
```

**Note:** The default timeout is 9000ms. Ensure your Lambda function timeout and SQS queue visibility timeout (if applicable) are set higher than the HTTP timeout.

### Utility Functions

#### Environment Variables

Safely retrieve environment variables with validation:

```typescript
import { env, envAsInteger } from "@tomassabol/aws-common"

// Get required string environment variable
const apiUrl = env("API_URL")

// Get required integer environment variable
const port = envAsInteger("PORT")

// Get optional integer with validation
const timeout = envAsInteger("TIMEOUT", {
  optional: true,
  min: 1000,
  max: 30000,
})
```

#### Axios Error Handling

Utilities for handling Axios errors:

```typescript
import { axiosErrorStatus, prettyAxiosError } from "@tomassabol/aws-common"

try {
  await axios.get("/api/endpoint")
} catch (error) {
  // Get HTTP status code
  const status = axiosErrorStatus(error) // number | undefined

  // Get formatted error object with request/response details
  const formattedError = prettyAxiosError(error)
}
```

#### Promise Helpers

Utilities for working with `Promise.allSettled`:

```typescript
import {
  isFulfilled,
  isRejected,
  getFulfilledValues,
  getRejectedReasons,
} from "@tomassabol/aws-common"

const results = await Promise.allSettled([promise1, promise2, promise3])

// Type guards
const fulfilled = results.filter(isFulfilled)
const rejected = results.filter(isRejected)

// Extract values
const values = getFulfilledValues(results) // T[]
const errors = getRejectedReasons(results) // unknown[]
```

#### Try-Catch Wrapper

Functional error handling without try-catch blocks:

```typescript
import { tryCatch } from "@tomassabol/aws-common"

// Async function
const result = await tryCatch(someAsyncFunction())
if (result.error) {
  // Handle error
  console.error(result.error)
} else {
  // Use data
  console.log(result.data)
}

// Sync function
const result = tryCatch(() => someSyncFunction())
if (result.error) {
  // Handle error
} else {
  // Use data
}
```

#### Logger

Logger utility that automatically uses AWS Lambda Powertools Logger in production and a no-op logger in tests:

```typescript
import { logger } from "@tomassabol/aws-common"

logger.info("Info message")
logger.error("Error message", { error })
logger.appendKeys({ userId: "123" })
```

#### Log Stream Data

Utility for logging stream data (useful for Lambda event processing):

```typescript
import { logStreamData } from "@tomassabol/aws-common"

logStreamData("Processing stream", streamData)
```

### Test Fixtures and Mocks

#### Axios Fixtures

Create Axios response and error fixtures for testing:

```typescript
import {
  createAxiosResponseFixture,
  createAxiosErrorFixture,
} from "@tomassabol/aws-common"

const response = createAxiosResponseFixture({
  status: 200,
  data: { id: 1 },
})
const error = createAxiosErrorFixture({
  message: "Not Found",
  status: 404,
})
```

#### EventBridge Fixture

Create EventBridge event fixtures for testing:

```typescript
import { createEventBridgeFixture } from "@tomassabol/aws-common"

const event = createEventBridgeFixture({
  detail: { userId: "123" },
  detailType: "MyEvent",
  time: "2024-01-01T00:00:00Z",
})
```

#### API Config Mock

Mock function for testing API config retrieval:

```typescript
import { mockGetApiConfigFromSecret } from "@tomassabol/aws-common"

// In your tests
mockGetApiConfigFromSecret.mockResolvedValue({
  baseURL: "https://api.example.com",
  apiKey: "test-key",
})
```

## API Reference

### Lambda Utilities

- `getServiceName()`: Get the globally set service name
- `setServiceName(serviceName: string)`: Set the global service name

### REST API Utilities

- `getApiConfigFromSecret(secretName: string)`: Get API config from AWS Secrets Manager
- `ApiConfig`: Type definition for API configuration
- `AbstractRestApiService`: Abstract base class for REST API services

### Utility Functions

- `env(name: string)`: Get required environment variable
- `envAsInteger(name: string, options?)`: Get environment variable as integer with validation
- `axiosErrorStatus(error: unknown)`: Extract HTTP status from Axios error
- `prettyAxiosError(error: unknown)`: Format Axios error for logging
- `isFulfilled<T>(result: PromiseSettledResult<T>)`: Type guard for fulfilled promises
- `isRejected<T>(result: PromiseSettledResult<T>)`: Type guard for rejected promises
- `getFulfilledValues<T>(results: PromiseSettledResult<T>[])`: Extract fulfilled values
- `getRejectedReasons<T>(results: PromiseSettledResult<T>[])`: Extract rejection reasons
- `tryCatch<T, E>(promise: Promise<T> | (() => T))`: Functional error handling wrapper
- `logger`: Logger instance (AWS Lambda Powertools in production, no-op in tests)
- `logStreamData(data: unknown)`: Log stream data

### Test Utilities

- `createAxiosResponseFixture(data?)`: Create Axios response fixture
- `createAxiosErrorFixture(data?)`: Create Axios error fixture
- `createEventBridgeFixture(data?)`: Create EventBridge event fixture
- `mockGetApiConfigFromSecret`: Mock for `getApiConfigFromSecret`

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Lint
npm run lint

# Format check
npm run format-check
```

## License

See repository for license information.

## Repository

- GitHub: https://github.com/tomassabol/aws-common
