import { AxiosError, AxiosHeaders } from "axios"
import {
  createAxiosResponseFixture,
  createAxiosErrorFixture,
} from "../../../src/test/fixtures/axios.fixture"

describe("axios.fixture", () => {
  test("should return correct axios response fixture", () => {
    const params = {
      status: 200,
      statusText: "200 OK",
      data: "Data",
    }

    const fixture = createAxiosResponseFixture(params)
    expect(fixture).toMatchObject(params)
  })

  test("should return axios response fixture with default values", () => {
    const params = {
      status: 200,
      statusText: "OK",
    }

    const fixture = createAxiosResponseFixture()
    expect(fixture).toMatchObject(params)
  })

  test("should return correct axios error fixture", () => {
    const params = {
      message: "Invalid request body",
      statusText: "400",
      status: 400,
      data: "Data",
    }

    const fixture = createAxiosErrorFixture(params)
    const error = new AxiosError(
      params.message,
      undefined,
      undefined,
      undefined,
      {
        data: params.data,
        status: params.status,
        statusText: params.statusText,
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
      }
    )

    expect(fixture).toBeInstanceOf(AxiosError)
    expect(fixture).toMatchObject(error)
  })

  test("should return axios error fixture with default values", () => {
    const params = {
      message: "Invalid request body",
    }

    const fixture = createAxiosErrorFixture(params)
    const error = new AxiosError(
      params.message,
      undefined,
      undefined,
      undefined,
      {
        data: undefined,
        status: 0,
        statusText: "OK",
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
      }
    )

    expect(fixture).toBeInstanceOf(AxiosError)
    expect(fixture).toMatchObject(error)
  })
})
