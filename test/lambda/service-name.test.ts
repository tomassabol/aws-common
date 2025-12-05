import { getServiceName, setServiceName } from "../../src/lambda/service-name"

describe("service-name", () => {
  test("should set service name", () => {
    setServiceName("test-service")
    expect(getServiceName()).toBe("test-service")
  })
})
