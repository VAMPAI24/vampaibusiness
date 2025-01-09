import React from "react";
import { headingProps } from "@/types";

const Heading = ({ title, desc }: headingProps) => {
  return (
    <div className="text-center px-4 sm:px-8">
      <h2 className="text-sec-901 font-bold font-rubik text-[32px] sm:text-[40px] lg:text-[48px] leading-tight">
        {title}
      </h2>
      <p className="text-[#283157] font-normal font-jakarta text-[14px] sm:text-[16px] mt-2 sm:mt-4">
        {desc}
      </p>
    </div>
  );
};

export default Heading;

