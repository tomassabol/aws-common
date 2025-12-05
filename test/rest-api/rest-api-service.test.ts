/* eslint-disable dot-notation */
import { AbstractRestApiService } from "../../src/rest-api/rest-api-service"

class DummyService extends AbstractRestApiService {}

describe("rest-api-service", () => {
  test("create dummy instance that extends abstract", () => {
    const dummyService = new DummyService("https://api.example.com", "api-key")
    expect(dummyService["baseURL"]).toBe("https://api.example.com")
    expect(dummyService["apiKey"]).toBe("api-key")
    expect(dummyService["timeout"]).toBe(9000)
  })

  test("create dummy instance that strips trailing slash in URL", () => {
    const dummyService = new DummyService("https://api.example.com/", "api-key")
    expect(dummyService["baseURL"]).toBe("https://api.example.com")
    expect(dummyService["apiKey"]).toBe("api-key")
    expect(dummyService["timeout"]).toBe(9000)
  })
})
