import { AxiosError, AxiosHeaders } from "axios"

export function createAxiosResponseFixture(
  params: {
    status?: number
    statusText?: string
    data?: unknown
  } = {}
) {
  const { status = 200, statusText = "OK", data } = params

  return {
    status,
    statusText,
    data,
  }
}

export function createAxiosErrorFixture(params: {
  message: string
  status?: number
  statusText?: string
  data?: unknown
  code?: string
}) {
  const {
    message,
    status,
    statusText = "OK",
    data,
    code = status?.toString(),
  } = params

  return new AxiosError(message, code, undefined, undefined, {
    data,
    status: status ?? 0,
    statusText,
    headers: {},
    config: {
      headers: new AxiosHeaders(),
    },
  })
}
