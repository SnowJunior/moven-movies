import axios, {
  AxiosInstance,
} from "axios";



export const apiClient = (): AxiosInstance => {
  const token = process.env.NEXT_PUBLIC_MOVIE_TOKEN;

  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ENV variables to store project secrets
export const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const imageURL = "https://image.tmdb.org/t/p/original";
