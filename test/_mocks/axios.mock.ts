export const mockAxios = {
  create: jest.fn().mockReturnThis(),
  isAxiosError: jest.fn(),
}

jest.mock("axios", () => mockAxios)
