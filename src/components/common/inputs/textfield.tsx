"use client";

import React, { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { InputsProps } from "@/types";

export interface inputProps extends InputsProps {
  type?:string,
  name:string,
  value?:string |number,
  icon?:string,
  currency?:string,
  error?:string,
  disabled?:boolean,
  children?:ReactNode,
  autoComplete?:string,
  onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
}


const Textfield: React.FC<inputProps> = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col gap-[5px] ">
        {props.label && (
          <span className="w-fit px-[5px] py-[0px] flex items-center gap-[10px]">
            {props.icon && (
              <i className={`my-[5px] ${props.icon} text-main-100`} />
            )}
            <p className="my-0 font-jakarta-sans font-[300] text-[.75em] text-main-900 capitalize">
              {props.label}
            </p>
          </span>
        )}

        <input
          className={`!bg-white font-jakarta-sans  relative w-full h-[45px] lg:h-[55px] ${
            props.currency
              ? "pl-[30px] pt-[0px]"
              : "pl-[16px] pt-[10px] pb-[10px] "
          }   font-[300] text-[1em] outline-none
            text-main-902 rounded-[5px] !bg-transparent border-[.8px] border-gray-400 focus:border-[.8px]  
             focus:border-main-600 focus:text-main-900 focus:!bg-main-100 
            disabled:!bg-neutral-200 disabled:!text-neutral-900 disabled:!border-neutral-600 disabled:!cursor-not-allowed
            invalid:border-red-700 invalid:text-red-800 
            focus:invalid:border-red-800 focus:invalid:ring-red-700 ${
              props.error && "!border-main-700 border-[.5px]"
            } ${props.addOns}`}
          type={
            props.type
              ? props.type === "password"
                ? passwordShown
                  ? "text"
                  : "password"
                : props.type
              : props.type
          }
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange ? props.onChange : () => console.log()}
          //   min={props.min}
          //   max={props.max}
          disabled={props.disabled}
          //   invalid={ props.error}
        />
        {props.currency && (
          <p className="my-0 font-[600] text-[1em] text-main-900 capitalize absolute top-[38px] left-[16px] z-5">
            {props.currency}
          </p>
        )}
        {props.type === "password" && (
          <p
            onClick={togglePasswordVisiblity}
            className="text-[.875em] font-[500] capitalize absolute right-5 top-[55%] text-main-600 cursor-pointer"
          >
            {" "}
            {passwordShown ? "hide" : "show"}{" "}
          </p>
        )}

        {props.error && (
          <span className="flex items-center gap-[5px] my-[-6px] b-[#FFE3E3] pl-[15px] pt-[10px] rounded-[0px] rounded-b-[5px] ">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="!my-0 text-[1em] text-red-700"
            />
            <p className="font-[300] text-[.9em] leading-[1.4em] text-red-900">
              {props.error ? props.error : " "}
            </p>
          </span>
        )}
        {props.children}
        {/* {props.info && (
          <span className="flex items-center gap-[5px] pl-[15px] pt-[10px] rounded-[0px] rounded-b-[5px] ">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="!my-0 text-[1em] text-main-700"
            />
            <p className="text-[.8em] font-jakarta font-[300] text-main-900">
              {props.info}
            </p>
          </span>
        )} */}
        {props.info && (
          <span className="w-full mt-[-.5em] bg-main-100 flex items-center gap-[5px] pl-[15px] py-[.5em] rounded-b-[.5em] ">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="!my-0 text-[.75em] text-main-700"
            />
            <p className="text-[.75em] font-jakarta font-[300] text-main-900 tracking-[.2px]">
              {props.info}
            </p>
          </span>
        )}
      </div>
    </div>
  );
};
export default Textfield;
