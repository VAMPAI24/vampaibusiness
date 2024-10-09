import { SubHeadingProps } from "@/types";
import React from "react";

const SubHeading = ({ title, description }: SubHeadingProps) => {
  return (
    <div className="lg:w-[560px] mb-4">
      <h3 className="font-rubik font-semibold text-[25px] text-sec-901">
        {title}
      </h3>
      <p className="font-jakarta font-normal txt-[18px]  text-sec-901">
        {description}
      </p>
    </div>
  );
};

export default SubHeading;
