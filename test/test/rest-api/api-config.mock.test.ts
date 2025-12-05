import { mockGetApiConfigFromSecret } from "../../../src/test/rest-api/api-config.mock"
import { getApiConfigFromSecret } from "../../../src/rest-api/api-config"

describe("eventbridge.fixture", () => {
  test("should mock getApiConfigFromSecret", async () => {
    const expected = {
      baseURL: "url",
      apiKey: "abcd1",
    }
    mockGetApiConfigFromSecret.mockResolvedValueOnce(expected)

    const result = await getApiConfigFromSecret("secret-name")
    expect(result).toMatchObject(expected)
  })
})
