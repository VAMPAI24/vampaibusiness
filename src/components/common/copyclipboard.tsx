import React from "react";

interface copyClipProps {
  body: string;
}
export const CopyClipboard: React.FC<copyClipProps> = (props) => {
  const [copied, setCopied] = React.useState(false);

  const { body } = props;
  const board = React.useRef(null);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(body);
    setCopied(true);
  };

  return (
    <span
      className="bg-main-100 border-[1px] border-dashed border-main-800 rounded-[10px] cursor-pointer flex items-center justify-between py-[.7em] px-[1em]  gap-[10px]"
      ref={board}
      onClick={copyCodeToClipboard}
    >
      <p className="my-0 text-[1em] w[60%] whitespace-normal font-[300] text-main-900 ">
        {body}
      </p>
      {body !== "No Referral" && (
        <p
          className={`my-0 text-[1em] lg:text-[1em] font-[400] px-[1em] py-[.5em] text-main-white cursor-pointer  rounded-full
                ${copied ? 'bg-green-800 text-white':'bg-yellow-700 text-white'}
            `}
        >
          {copied ? "Copied" : "Copy"}
        </p>
      )}
    </span>
  );
};
