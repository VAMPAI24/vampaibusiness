import React from "react";
import Image from "next/image";
import { PreviewCardProps } from "@/types";
import { Pencil } from "lucide-react";

const PreviewCard = ({ imgUrl, addOn, text, onEdit }: PreviewCardProps) => {
  return (
    <div className={`w-fit flex gap-2 items-center justify-start cursor-pointer hover:text-white ${addOn}`}>
      <Image
        src={imgUrl}
        alt="card-image"
        height={10}
        width={20}
        className=""
      />
      <div className="flex gap-2">
        <p className="font-jakarta !font-[500] whitespace-nowrap group-hover:text-white " >{text}</p>
        {onEdit && (
          <button
            onClick={onEdit}
            className="ml-2 text-[#254E7D] hover:text-[#1a3a56]"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewCard;
