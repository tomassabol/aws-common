import { createAxiosError } from "../_utils/create-axios-error"
import { mockAxios } from "../_mocks/axios.mock"
import { axiosErrorStatus, prettyAxiosError } from "../../src/utils/axios"

describe("axios", () => {
  describe("axiosErrorStatus", () => {
    test("should return status if axios error", () => {
      mockAxios.isAxiosError.mockResolvedValueOnce(true)
      const axiosError = createAxiosError(404)
      expect(axiosErrorStatus(axiosError)).toBe(404)
    })

    test("should return undefined if not axios error", () => {
      mockAxios.isAxiosError.mockResolvedValueOnce(true)
      const notAxiosError = new Error("not-axios-error")
      expect(axiosErrorStatus(notAxiosError)).toBeUndefined()
    })
  })

  describe("prettyAxiosError", () => {
    test("should return pretty error object", () => {
      mockAxios.isAxiosError.mockResolvedValueOnce(true)
      const axiosError = createAxiosError(404)
      expect(prettyAxiosError(axiosError)).toEqual({
        name: "AxiosError",
        message: "Axios Error",
        status: 404,
        statusText: "error",
        code: "404",
        method: undefined,
        baseURL: undefined,
        url: undefined,
        timeout: undefined,
        requestData: {},
        responseData: {},
      })
    })

    test("should just return error if not axios error", () => {
      const notAxiosError = new Error("not-axios-error")
      expect(prettyAxiosError(notAxiosError)).toEqual(notAxiosError)
    })
  })
})
