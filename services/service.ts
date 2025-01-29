import { apiClient } from "@/utils/utils";

export const MoviesService = {
  // Function allows for a user to serch of a movie in the catalogue
  async findMovieByName(name: string) {
    const response = await apiClient({
      url: `/search/movie?query=${name}`,
      method: "get",
    });
    
    return response;
  },

  // Fetches the most watched and popular movies
  async fetchPopularMovies(pageNumber: string) {
    const response = await apiClient({
      url: `/movie/popular?page=${pageNumber ?? 1}`,
      method: "get",
    });

    return response;
  },
};
