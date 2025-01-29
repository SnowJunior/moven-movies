import { MovieModalProps } from "@/model/components";
import { imageURL } from "@/utils/utils";
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  onClose,
  isLoading: globalLoading,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const isLoading = globalLoading || !isImageLoaded;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg w-[70%] p-12 lg:p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-700"
        >
          <IoClose size={30} />
        </button>
        <div className="flex flex-row-reverse lg:gap-4">
          <div className=" flex flex-col gap-2">
            <Skeleton
              className="rounded-lg w-full lg:hidden"
              isLoaded={!isLoading}
            >
              <Image
                src={`${
                  movie.backdrop_path
                    ? `${imageURL}${movie.backdrop_path}`
                    : "https://heroui.com/images/hero-card-complete.jpeg"
                }`}
                alt={movie.title}
                className="rounded-lg w-full h-fit object-cover"
                width={270}
                height={100}
                onLoad={handleImageLoad}
              />
            </Skeleton>
            <Skeleton className="rounded-lg" isLoaded={!isLoading}>
              <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
              <div className="flex gap-1">
                <p className="text-lg mb-4 font-semibold">Rated:</p>
                <p className="text-lg mb-4">
                  {movie.adult ? "18+" : "PG"}
                </p>
              </div>
            </Skeleton>
            <Skeleton className="mt-2 rounded-lg" isLoaded={!isLoading}>
              <div className="flex flex-col gap-1">
                <p className="text-lg font-bold">Description: </p>
                <p className="text-md mt-1 overflow-y-auto max-h-48 md:max-h-none">
                  {movie.overview}
                </p>
              </div>
            </Skeleton>
            <Skeleton className="mt-2 rounded-lg" isLoaded={!isLoading}>
              <div className="flex flex-col lg:flex-row gap-1 mt-4 lg:items-center">
                <p className="text-lg font-bold">Viewer rating: </p>
                <div className="flex items-center gap-1">
                  <p className="text-md mt-1">{movie.vote_average}</p>
                  <FaStar color="gold" size={20} />
                </div>
              </div>
            </Skeleton>
            <Skeleton className="mt-2 rounded-lg" isLoaded={!isLoading}>
              <div className="flex flex-col lg:flex-row gap-1">
                <p className="text-lg font-bold">Release date: </p>
                <p className="text-md mt-1">{movie.release_date}</p>
              </div>
            </Skeleton>
            <Skeleton className="mt-2 rounded-lg" isLoaded={!isLoading}>
              <div className="flex flex-col lg:flex-row gap-1">
                <p className="text-lg font-bold">Popularity: </p>
                <p className="text-md mt-1">{movie.popularity}</p>
              </div>
            </Skeleton>
          </div>

          <Skeleton
            className="rounded-lg w-full hidden lg:block"
            isLoaded={!isLoading}
          >
            <Image
              src={`${
                movie.poster_path
                  ? `${imageURL}${movie.poster_path}`
                  : "https://heroui.com/images/hero-card-complete.jpeg"
              }`}
              alt={movie.title}
              className="rounded-lg w-full h-fit object-cover hidden lg:block"
              width={270}
              height={100}
              onLoad={handleImageLoad}
            />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
