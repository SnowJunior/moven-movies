"use client";
import CardComponent from "@/components/ui/card";
import { CardProps } from "@/model/components";
import { MoviesService } from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import { IoMdSearch } from "react-icons/io";
import PaginationComponent from "@/components/ui/pagination";
import MovieModal from "@/components/shared/CardModal";
import useDebounce from "@/hooks/useDebounce";

const DashboardScreen = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<CardProps | null>(null);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Handle fetch of movie list
  const {
    data: popular,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useQuery({
    queryKey: ["popular", currentPage],
    queryFn: () => MoviesService.fetchPopularMovies(currentPage.toString()),
    enabled: !debouncedSearchValue, // Disable popular movies query when searching
  });

  // Handle the search function for fetching movies
  const {
    data: queryMovies,
    isFetching: isSearchLoading,
    isError: isSearchError,
  } = useQuery({
    queryKey: ["search", debouncedSearchValue],
    queryFn: () => MoviesService.findMovieByName(debouncedSearchValue),
    enabled: !!debouncedSearchValue, // Only run search query when there's a search value
  });

  // Handle page changes on action click
  const handlePageChange = (
    action: "next" | "prev" | "goTo",
    page?: number
  ) => {
    const totalPages = popular?.data.total_pages || 5;
    setCurrentPage((prev) => {
      if (action === "next" && prev < totalPages) return prev + 1;
      if (action === "prev" && prev > 1) return prev - 1;
      if (action === "goTo" && page && page >= 1 && page <= totalPages)
        return page;
      return prev;
    });
  };

  const handleMovieClick = (movie: CardProps) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  // List movies depending on what is rendered either all movies or searched
  const movies = debouncedSearchValue
    ? queryMovies?.data.results
    : popular?.data.results;

  // Check on the UI state when a loading action is occuring
  const isLoading = debouncedSearchValue ? isSearchLoading : isPopularLoading;
  const isError = debouncedSearchValue ? isSearchError : isPopularError;

  return (
    <div className="mx-auto w-[95%]">
      <div className="flex flex-col mt-4">
        <div className="flex justify-end items-center w-full">
          <Input
            label="Search"
            labelPlacement="outside"
            placeholder="Search movies..."
            className="lg:w-1/5 mb-3 md:w-2/5"
            value={searchValue}
            startContent={
              <IoMdSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <p className="text-2xl font-bold">
          {debouncedSearchValue ? "Search Results" : "Movies List"}
        </p>
        {isError ? (
          <p>Error loading movies.</p>
        ) : (
          <div className="grid xl:grid-cols-3 gap-6 mt-4 md:grid-cols-2">
            {movies?.map((movie: CardProps) => (
              <CardComponent
                key={movie.id}
                props={movie}
                onClick={() => handleMovieClick(movie)}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}
        {!debouncedSearchValue && (
          <div className="flex justify-center items-center mt-10 mb-5">
            <PaginationComponent
              page={{
                onNextDisabled:
                  currentPage === (popular?.data.total_pages || 1),
                onPreviousDisabled: currentPage === 1,
                onNext: () => handlePageChange("next"),
                onPrevious: () => handlePageChange("prev"),
                onPage: currentPage,
                pages: Math.min(popular?.data.total_pages || 1, 10),
                goToPage: (page) => handlePageChange("goTo", page),
              }}
            />
          </div>
        )}
      </div>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} isLoading={isLoading} />
      )}
    </div>
  );
};

export default DashboardScreen;
