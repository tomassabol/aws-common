import { createEventBridgeFixture } from "../../../src/test/fixtures/eventbridge.fixture"

describe("eventbridge.fixture", () => {
  const defaultParams = {
    version: "1",
    account: "2345678",
    region: "region",
    resources: [],
    source: "picking-info",
  }

  test("should return correct eventbridge fixture", () => {
    const detail = {
      foo: "bar",
    }

    const params = {
      id: "200111",
      detail,
      detailType: "picking-started",
      time: "2024-06-11T05:25:14.953Z",
    }

    const fixture = createEventBridgeFixture(params)
    expect(fixture).toMatchObject({
      detail,
      "detail-type": params.detailType,
      id: params.id,
      time: params.time,
      ...defaultParams,
    })
  })

  test("should return eventbridge fixture with default values", () => {
    const detail = {
      foo: "bar",
    }

    const params = {
      detail,
      detailType: "picking-started",
      time: "2024-06-11T05:25:14.953Z",
    }

    const fixture = createEventBridgeFixture(params)
    expect(fixture).toMatchObject({
      detail,
      "detail-type": params.detailType,
      id: "123456",
      time: params.time,
      ...defaultParams,
    })
  })
})
