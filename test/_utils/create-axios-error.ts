import { AxiosError, AxiosHeaders } from "axios"

export const createAxiosError = (status: number) => {
  const headers = new AxiosHeaders()
  const data = {}

  const error = new AxiosError(
    "Axios Error",
    status.toString(),
    {
      headers,
      data,
    },
    undefined,
    {
      status,
      data,
      statusText: "error",
      config: {
        headers,
        data,
      },
      headers,
    }
  )

  return error
}
