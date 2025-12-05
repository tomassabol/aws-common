import { EventBridgeEvent } from "aws-lambda"

export function createEventBridgeFixture<T>(params: {
  id?: string
  detail: T
  detailType: string
  time: string
}): EventBridgeEvent<string, unknown> {
  const { id, detail, detailType, time } = params

  return {
    detail,
    "detail-type": detailType,
    id: id ?? "123456",
    version: "1",
    account: "2345678",
    time,
    region: "region",
    resources: [],
    source: "picking-info",
  }
}
