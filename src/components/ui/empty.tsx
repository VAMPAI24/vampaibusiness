"use client";
import React from "react";
import { Platformbtn } from "../common/buttons";
import empty from "@/public/svgs/no-files.svg";
import Image from "next/image";

interface empProps {
  title: string;
  subtitle?: string;
  btnName?: string;
  click?: () => void;
}
export const Empty: React.FC<empProps> = (props) => {
  return (
    <div className="flex w-full max-w-[300px] mx-auto">
      <div className="flex flex-col items-center gap-[30px]  py-[50px]">
        <Image src={empty} className="lg:w-[220px]" alt="success trophy svg" />
        <span className="flex flex-col gap-[5px] items-center text-center">
          <p className="my-0 font-[400] text-main-902 leading-[1.2em] text-[1.25em]">
            {props.title}
          </p>
          <p className="font-[400] text-main-901 leading-[1.5em] text-[1em]">
            {props.subtitle}
          </p>
        </span>
        {props.click && (
          <Platformbtn
            type="normal"
            addOns="rounded-full h-[45px] !px-[30px] !w-fit"
            name={props.btnName}
            click={props.click}
          />
        )}
      </div>
    </div>
  );
};
