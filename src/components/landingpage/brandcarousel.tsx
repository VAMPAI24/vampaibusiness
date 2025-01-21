import React from "react";
import Image from "next/image";

const brandcarousel = ({ imgUrl }: { imgUrl: string }) => {
  return <Image src={imgUrl} alt="brands-images" className="h-[2.5em]" />;
};

export default brandcarousel;
