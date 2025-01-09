import React from "react";
import Image from "next/image";

interface PersonCardProps {
  src: string;
  name: string;
  role: string;
  alt: string;
}

const PersonCard = ({ src, name, role, alt }: PersonCardProps) => {
  return (
    <div>
      <Image
        src={src}
        width={250}
        height={250}
        alt={alt}
        className="max-w-full object-cover"
      />
      <div className="mt-4">
        <p className="text-[20px] text-sec-901 font-semibold font-rubik">
          {name}
        </p>
        <p className="text-[16px] font-jakarta font-light text-[#283157] ">
          {role}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
