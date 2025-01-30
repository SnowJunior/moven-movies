import "@testing-library/jest-dom";
import axios from "axios";
import { apiClient } from "./utils"; // Adjust path

jest.mock("axios");

describe("apiClient", () => {
  const mockToken = "test_token";
  const mockResponse = { data: { test: "data" }, status: 200 };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_MOVIE_TOKEN = mockToken;
    process.env.NEXT_PUBLIC_API_URL = "https://api.themoviedb.org/3";
  });

  it("should create an Axios instance with the correct token", () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    });

    apiClient();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "https://api.themoviedb.org/3",
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });
  });

  it("should handle successful API requests", async () => {
    const mockAxios = {
      get: jest.fn().mockResolvedValue(mockResponse),
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxios);

    const client = apiClient();
    const response = await client.get("/test");
    expect(response).toEqual(mockResponse);
  });

});
