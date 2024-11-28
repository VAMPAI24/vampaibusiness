import React from "react";
import Image from "next/image";
import CardImage from "@/public/svgs/Jobs/job-globe.svg";
import { JobpointerProps } from "@/types";

const Jobpointer = ({ title, descOne, descTwo, descThree }: JobpointerProps) => {
  return (
    <div className="border border-[#afc8f8] pt-4 rounded-lg flex flex-col md:flex-row gap-6 md:gap-10 w-full">
      <Image
        src={CardImage}
        alt="card-image"
        height={250}
        width={250}
        className="mx-auto md:ml-10"
      />

      <div className="w-full px-3 lg:px-0">
        <div>
            <p className="mb-2 text-[#4E5A6C] font-rubik text-md">{title}</p>
        </div>
        <div className="flex items-baseline mb-2 text-[#4E5A6C] font-jakarta text-sm">
          <span className="font-semibold mr-2">1.</span>
          <p className="flex-1">{descOne}</p>
        </div>
        <div className="flex items-baseline mb-2 text-[#4E5A6C] font-jakarta text-sm">
          <span className="font-semibold mr-2">2.</span>
          <p className="flex-1">{descTwo}</p>
        </div>
        <div className="flex items-baseline mb-2 text-[#4E5A6C] font-jakarta text-sm">
          <span className="font-semibold mr-2">3.</span>
          <p className="flex-1">{descThree}</p>
        </div>
      </div>
    </div>
  );
};

export default Jobpointer;
