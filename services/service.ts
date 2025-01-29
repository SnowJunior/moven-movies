/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/utils/utils";

export const MoviesService = {
  // Function allows for a user to serch of a movie in the catalogue
  async findMovieByName(name: string) {
    const api = apiClient();
    try {
      const response = await api.get(`/search/movie?query=${name}`);

      return response;
    } catch (e: any) {
      throw Error(e);
    }
  },

  // Fetches the most watched and popular movies
  async fetchPopularMovies(pageNumber: string) {
    const api = apiClient();
    try {
      const response = await api.get(`/movie/popular?page=${pageNumber ?? 1}`);
      return response;
    } catch (e: any) {
      throw Error(e);
    }
  },
};
