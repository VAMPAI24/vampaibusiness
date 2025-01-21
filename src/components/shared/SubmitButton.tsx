import React from "react";
import { Button } from "../ui/button";
import { SubmitButtonProps } from "@/types";
import { PulseLoader } from "react-spinners";

const SubmitButton = ({
  isLoading,
  loadingText,
  className,
  clickFn,
  children,
  disabled,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      className={className ?? " text-white"}
      onClick={clickFn}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <PulseLoader color="#ffffff" size="10px" />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
