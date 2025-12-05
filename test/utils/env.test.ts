import { env, envAsInteger } from "../../src/utils/env"

describe("env", () => {
  describe("env", () => {
    test("should return value if exists", () => {
      process.env.TEST = "test"
      expect(env("TEST")).toBe("test")
    })

    test("should throw error if not exists", () => {
      expect(() => env("NOT_EXISTS")).toThrow(
        'Invalid environment variable "NOT_EXISTS"'
      )
    })
  })

  describe("envAsInteger", () => {
    beforeEach(() => {
      // Remove TEST env variable
      delete process.env.TEST
    })

    test("should return value if exists", () => {
      process.env.TEST = "1"
      expect(envAsInteger("TEST")).toBe(1)
    })

    test("should throw error if not exists", () => {
      expect(() => envAsInteger("NOT_EXISTS")).toThrow(
        'Invalid environment variable "NOT_EXISTS"'
      )
    })

    test("should throw error if not a number", () => {
      process.env.NOT_A_NUMBER = "not-a-number"
      expect(() => envAsInteger("NOT_A_NUMBER")).toThrow(
        'Environment variable "NOT_A_NUMBER" expected to be a number'
      )
    })

    test("should return undefined if optional=true and value does not exist", () => {
      expect(envAsInteger("TEST", { optional: true })).toBeUndefined()
    })

    test("should return value if optional=true and value exists", () => {
      process.env.TEST = "1"
      expect(envAsInteger("TEST", { optional: true })).toBe(1)
    })

    test("should return undefined if optional=true and value lower then min", () => {
      process.env.TEST = "1"
      expect(envAsInteger("TEST", { optional: true, min: 10 })).toBeUndefined()
    })

    test("should return undefined if optional=true and value higher then max", () => {
      process.env.TEST = "10"
      expect(envAsInteger("TEST", { optional: true, max: 1 })).toBeUndefined()
    })

    test("should return value if value between min and max", () => {
      process.env.TEST = "1"
      expect(envAsInteger("TEST", { optional: true, min: 1, max: 1 })).toBe(1)
    })
  })
})
