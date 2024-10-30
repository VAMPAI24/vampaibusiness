import React from "react";

interface StepIndicatorProps {
  active: number;
  steps?: string[];
  title?: string;
  showText?: boolean; 
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  active,
  steps = [],
  showText = false, 
}) => {
  return (
    <div className="mx-auto w-full h-fit flex flex-col items-center gap-[1em]">
      <div className="w-full flex items-center justify-center gap-[.5em]">
        {steps?.map((item, index) => (
          <div
            key={index.toString()}
            className="w-full flex flex-col items-start gap-[.5em]"
          >
            <div
              className={`min-w-full min-h-[5px] text-[1em] flex items-center justify-center font-outfit text-base font-normal rounded-[0.5em] ${
                index > active
                  ? "bg-main-200 text-main-800"
                  : "bg-main-600 text-white"
              }`}
            ></div>
            {showText && (
              <p
                className={`text-[1em] pl-[.5em] font-[300] capitalize ${
                  index > active ? "text-main-300" : "text-main-900"
                }`}
              >
                {item}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
