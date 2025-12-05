import { mockSecretsManagerService } from "@tomassabol/aws-services/secrets-manager.mock"
import { getApiConfigFromSecret } from "../../src/rest-api/api-config"

describe("api-config", () => {
  describe("getApiConfigFromSecret", () => {
    test("should set api config", async () => {
      mockSecretsManagerService.getSecretAsObject.mockResolvedValue({
        baseURL: "https://test.com",
        apiKey: "test-key",
      })

      await expect(getApiConfigFromSecret("test-secret")).resolves.toEqual({
        apiKey: "test-key",
        baseURL: "https://test.com",
      })
    })

    test("should fail when not correct types", async () => {
      mockSecretsManagerService.getSecretAsObject.mockResolvedValue({
        baseURL: "https://test.com",
        apiKey: 1,
      })

      await expect(getApiConfigFromSecret("test-secret")).rejects.toThrow(
        "Invalid value of secret test-secret; expected JSON object with baseURL and apiKey attributes"
      )
    })
  })
})
