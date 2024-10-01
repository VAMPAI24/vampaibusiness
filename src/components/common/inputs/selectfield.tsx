import React, { useState } from "react";
import Select, { StylesConfig } from "react-select";
import { selectProps } from "@/utils/models/inputsmodel";

type OptionType = { readonly label: string; readonly value: string | number };

const Selectfield: React.FC<selectProps> = (props) => {
  const [tip, setTip] = useState(false);

  const handleChange = (selectedOption: OptionType | unknown) => {
    if (
      typeof selectedOption === "object" &&
      selectedOption !== null &&
      "value" in selectedOption
    ) {
      const option = selectedOption as OptionType;
      props.onChange(props.name, option.value as string);
    }
  };

  const style: StylesConfig = {
    control: (base) => ({
      ...base,
      height: props.height ? props.height : "50px",
      // backgroundColor:isFocused?'#E5EFFF':'red',
      // border: isFocused ? '.5px solid #0061F9':'.5px solid #002156',
      boxShadow: "0 !important",
      "&:hover": {
        border: ".5px solid #0061F9",
        backgroundColor: "#F7FCFF",
        color: "#480500",
      },
      fontSize: "1em",
      fontWeight: 300,
      color: "#0061F9",
      tabIndex: 1,
    }),
    option: (styles) => {
      return {
        ...styles,
        color: "#151617",
        backgroundColor: "transparent",
        borderBottom: "1px solid #F8F6F5",
        lineHeight: "1.5em",
        display: "flex",
        alignItems: "center",
        zIndex: 9999,
        fontWeight: 200,
        fontSize: ".75em",
        "&:hover": {
          backgroundColor: "#F7FCFF",
          color: "#0061F9",
        },
      };
    },
  };

  return (
    <div
      className="select-input relative w-full flex flex-col gap-[5px]"
      tabIndex={1}
    >
      <span className="w-full flex items-center justify-between">
        {props.label && (
          <label
            htmlFor={props.id}
            className="my-0 font-[400] text-[.8em] text-main-901 capitalize"
          >
            {props.label}
          </label>
        )}
        {props.tip && (
          <i
            className="fas fa-question-circle text-neutral-700 text-[1.2em]"
            onClick={() => setTip(!tip)}
          />
        )}
      </span>
      <div className="select-box w-full z[9999]">
        <Select
          isMulti={props.isMulti}
          inputId={props.id}
          className="basic-single"
          placeholder={props.placeholder}
          options={props.options}
          value={{
            value: props.value,
            label: props.options.filter((item) => item.value === props.value)[0]
              ?.label,
          }}
          // value={props.value}
          onChange={handleChange}
          styles={style}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
        {props.info && (
          <p className="my-[5px] text-[.9em] text-main-600 capitalize">
            {props.info}
          </p>
        )}
      </div>
      {/* {tip && <AlertInfo body={props.tip} />} */}
    </div>
  );
};

export default Selectfield;
