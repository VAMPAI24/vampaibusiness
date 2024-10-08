import { ButtonProps } from "@/types";
import React from "react";

const Button = ({ text, imgIcon, variant }: ButtonProps) => {
  return (
    <button
      className={`text-center p-2.5 flex items-center justify-center ${variant}`}
    >
      <p>{text}</p> &nbsp;
      {imgIcon && <span className="icon">{imgIcon}</span>}
    </button>
  );
};

export default Button;
