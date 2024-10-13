import React from "react";


interface Props {
  value?: boolean;
  label: string | boolean;
  onSelect: () => void;
}

const RadioField: React.FC<Props> = ({ value = false, label, onSelect }) => {
  return (
    <div
      className={`px-[1em] py-[.65em] rounded-xl border flex space-x-3 cursor-pointer ${
        value ? `border-main-300` : "border-gray-10"
      } ${value ? "bg-white" : "bg-gray-10"}`}
      onClick={onSelect}
    >

      
      <span
        className={`cursor-pointer px-[.4rem] flex items-center  rounded-full ${
          value ? `bg-main-700` : "bg-white border border-[#7A7978]"
        }`}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 6 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.20912 4.66694C2.05979 4.66694 1.91046 4.61027 1.79646 4.49627L0.214457 2.91427C-0.013543 2.68627 -0.013543 2.31694 0.214457 2.0896C0.442457 1.8616 0.811124 1.86094 1.03912 2.08894L2.20912 3.25894L4.96112 0.506938C5.18912 0.278937 5.55779 0.278937 5.78579 0.506938C6.01379 0.734938 6.01379 1.10427 5.78579 1.33227L2.62179 4.49627C2.50779 4.61027 2.35846 4.66694 2.20912 4.66694"
            fill="white"
          />
        </svg>
      </span>
      <span className="my-0 font-jakarta-sans font-[300] text-[1em] text-main-900 capitalize">
        {label}
      </span>
    </div>
  );
};

export default RadioField;
