import { useState } from "react";
import { CardProps } from "@/model/components";
import { imageURL } from "@/utils/utils";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";

export default function CardComponent({
  props,
  isLoading: globalLoading,
  onClick,
}: Readonly<{ props: CardProps; isLoading: boolean; onClick?: () => void }>) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const isLoading = globalLoading || !isImageLoaded;

  return (
    <div id="cardItem" onClick={onClick}>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <Skeleton className="rounded-lg w-full" isLoaded={!isLoading}>
            <h4 className="font-bold text-large">{props.title}</h4>
          </Skeleton>
          <div className="flex flex-row w-full gap-2 items-center">
            <Skeleton className="rounded-lg w-1/8" isLoaded={!isLoading}>
              <p className="text-lg font-semibold">Rated: </p>
            </Skeleton>
            <Skeleton className="rounded-lg w-1/6" isLoaded={!isLoading}>
              <p className="text-base uppercase font-bold">
                {props.adult ? "18+" : "PG"}
              </p>
            </Skeleton>
          </div>
          <div className="flex flex-row gap-1">
            <Skeleton className="rounded-lg" isLoaded={!isLoading}>
              <p className="text-lg font-bold">Overview:</p>
            </Skeleton>
            <Skeleton className="rounded-lg" isLoaded={!isLoading}>
              <p className="text-base font-medium mt-1">
                {props.overview.length > 40
                  ? `${props.overview.slice(0, 40)}...`
                  : props.overview}
              </p>
            </Skeleton>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Skeleton className="rounded-xl w-full h-42" isLoaded={!isLoading}>
            <Image
              alt={props.title}
              className={`object-cover w-full rounded-xl transition-opacity duration-500 h-60 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={`${
                props.backdrop_path
                  ? `${imageURL}${props.backdrop_path}`
                  : "https://heroui.com/images/hero-card-complete.jpeg"
              }`}
              width={270}
              height={100}
              onLoad={handleImageLoad}
            />
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
}
