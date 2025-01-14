import { SubHeadingProps } from "@/types";
import React from "react";

const SubHeading = ({ title, description, header }: SubHeadingProps) => {
  return (
    <div className="lg:w-[560px] mb-4">
      <p className="uppercase text-main-600 font-semibold font-jakarta text-sm mb-2">{header}</p>
      <h2 className="font-rubik font-bold text-[24px] lg:text-[48px] text-sec-901 mb-4 leading-[1.25em]">
        {title}
      </h2>
      <p className="font-jakarta font-normal txt-[18px]  text-sec-901">
        {description}
      </p>
    </div>
  );
};

export default SubHeading;



