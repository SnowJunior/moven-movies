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
      <div className="bg-white rounded-lg w-[70%] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-700"
        >
          <IoClose size={30} />
        </button>
        <div className="flex flex-row-reverse gap-4">
          <div className=" flex flex-col gap-2">
            <Skeleton className="rounded-lg" isLoaded={!isLoading}>
              <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
              <p className="text-lg mb-4">
                Rated: {movie.adult ? "18+" : "PG"}
              </p>
            </Skeleton>
            <Skeleton className="mt-2 rounded-lg" isLoaded={!isLoading}>
              <div className="flex gap-1">
                <p className="text-lg font-bold">Description: </p>
                <p className="text-md mt-1">{movie.overview}</p>
              </div>
            </Skeleton>
            <Skeleton className="mt-2 rounded-lg" isLoaded={!isLoading}>
              <div className="flex gap-1 mt-4 items-center">
                <p className="text-lg font-bold">Viewer rating: </p>
                <p className="text-md mt-1">{movie.vote_average}</p>
                <FaStar color="gold" size={20} />
              </div>
            </Skeleton>
            <Skeleton className="mt-2 rounded-lg" isLoaded={!isLoading}>
              <div className="flex gap-1">
                <p className="text-lg font-bold">Release date: </p>
                <p className="text-md mt-1">{movie.release_date}</p>
              </div>
            </Skeleton>
            <Skeleton className="mt-2 rounded-lg" isLoaded={!isLoading}>
              <div className="flex gap-1">
                <p className="text-lg font-bold">Popularity: </p>
                <p className="text-md mt-1">{movie.popularity}</p>
              </div>
            </Skeleton>
          </div>

          <Skeleton className="rounded-lg w-full" isLoaded={!isLoading}>
            <Image
              src={`${
                movie.poster_path
                  ? `${imageURL}${movie.poster_path}`
                  : "https://heroui.com/images/hero-card-complete.jpeg"
              }`}
              alt={movie.title}
              className="rounded-lg w-full"
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
