import React from "react";
import Image from "next/image";
import { ImageSectionProps } from "@/types";

const ImageSection = ({
  imageSrc,
  altText = "image",
  imageHeight = 1000,
  imageWidth = 1000,
}: ImageSectionProps) => {
  return (
    <Image
      src={imageSrc}
      height={imageHeight}
      width={imageWidth}
      alt={altText}
      className="hidden h-full object-cover lg:block w-full"
    />
  );
};

export default ImageSection;
