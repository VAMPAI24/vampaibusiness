import React from "react";

interface StepIndicatorProps {
  active: number;
  steps: string[];
  title?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  active,
  steps,
}) => {
  // const isLastChild = (index: number) => index === steps.length - 1;
  // const activeTitle = steps[active];

  return (
    <div className="mx-auto w-full  h-fit flex flex-col items-center gap-[1em]">
      <div className="w-full flex items-center justify-center gap-[.5em]">
        {/* {steps.map((_item, index) => (
          <div key={index.toString()} className="w-fit flex items-center">
            <p
              className={`min-w-[3em] min-h-[3em] w-[3em] h-[3em] text-[1em] flex items-center justify-center font-outfit text-base font-normal rounded-[.5em] border ${
                index > active
                  ? "bg-main-200 text-main-800"
                  : "bg-main-600 text-white"
              }`}
            >
              {index + 1}
            </p>
            {!isLastChild(index) && (
              <hr
                className={`w-[1em] md:w-[5em] !h bg-orange ${
                  index < active ? "bg-main-600" : "bg-neutral-500"
                }`}
              />
            )}
          </div>
        ))} */}

        {steps.map((item, index) => (
          <div
            key={index.toString()}
            className="w-full flex flex-col items-start gap-[.5em]"
          >
            <div
              className={`min-w-full min-h-[5px] text-[1em] flex items-center justify-center font-outfit text-base font-normal rounded-[.5em] ${
                index > active
                  ? "bg-main-200 text-main-800"
                  : "bg-main-600 text-white"
              }`}
            ></div>
            <p
              className={`text-[1em] pl-[.5em]  font-[300] capitalize ${
                index > active ? " text-main-300" : " text-main-900"
              } `}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
