import "@testing-library/jest-dom";
import axios from "axios";
import {
  apiClient,
  baseURL,
  imageURL,
  apiKey,
  messangerID,
  appID,
} from "./utils"; // Adjust path

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

  // it("should handle API error responses", async () => {
  //   const mockAxios = {
  //     get: jest.fn().mockRejectedValue({
  //       response: { status: 400, data: "Bad Request" },
  //     }),
  //   };

  //   (axios.create as jest.Mock).mockReturnValue(mockAxios);

  //   const client = apiClient();
  //   await expect(client.get("/test")).rejects.toThrow("API Error: 400 - Bad Request");
  // });

  // it("should handle API request errors", async () => {
  //   const mockAxios = {
  //     get: jest.fn().mockRejectedValue({ request: "Test Request" }),
  //   };

  //   (axios.create as jest.Mock).mockReturnValue(mockAxios);

  //   const client = apiClient();
  //   await expect(client.get("/test")).rejects.toThrow("API Error: No response received from server");
  // });

  // it("should handle generic API errors", async () => {
  //   const mockAxios = {
  //     get: jest.fn().mockRejectedValue(new Error("Test Error Message")),
  //   };

  //   (axios.create as jest.Mock).mockReturnValue(mockAxios);

  //   const client = apiClient();
  //   await expect(client.get("/test")).rejects.toThrow("API Error: Test Error Message");
  // });

  it("should export environment variables", () => {
    expect(baseURL).toBe(process.env.NEXT_PUBLIC_API_URL);
    expect(imageURL).toBe("https://image.tmdb.org/t/p/original");
    expect(apiKey).toBe(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    expect(messangerID).toBe(
      process.env.NEXT_PUBLIC_FIREBASE_MESSENGER_ID
    );
    expect(appID).toBe(process.env.NEXT_PUBLIC_FIREBASE_APP_ID);
  });
});
