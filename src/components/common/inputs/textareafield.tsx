import React from "react";
import "./styles.scss";
import { InputsProps } from "@/types";

export interface textAreaProps extends InputsProps {
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textareafield: React.FC<textAreaProps> = ({
  value,
  onChange,
  placeholder,
  name,
  label,
  addOns,
}) => {
  return (
    <div>
      <div className="relative w-full flex flex-col gap-[5px] ">
        {label && (
          <p className="my-0 font-jakarta-sans font-[300] text-[.75em] text-main-900 capitalize">
            {label}
          </p>
        )}
        <textarea
          className={`text-bo font-jakarta-sans !w-full !max-w-full h-[100px] lg:h-[140px] px-[1em] py-[10px]  font-[300] text-[1em] leading-[1.4em] outline-none
            text-neutral-900 rounded-[5px] border-[.8px] border-neutral-400
            focus:bg-main-100 focus:border-main-600 focus:text-main-901
            disabled:bg-neutral-200 disabled:text-neutral-900 disabled:border-neutral-600 disabled:cursor-not-allowed
            invalid:border-main-800 invalid:text-main-800 invalid:bg-main-200 resizey resizenone ${addOns} `}
          // type="text"
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          //   disabled={disabled}
        />
      </div>
    </div>
  );
};
export default Textareafield;
