import { getApiConfigFromSecret } from "../../rest-api/api-config"

jest.mock("../../rest-api/api-config")

export const mockGetApiConfigFromSecret = jest.mocked(getApiConfigFromSecret)
