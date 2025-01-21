import React from "react";
import Image from "next/image";
import { PreviewCardProps } from "@/types";
import { Pencil } from "lucide-react";

const PreviewCard = ({ imgUrl, text, onEdit }: PreviewCardProps) => {
  return (
    <div className="flex gap-2 items-center justify-start">
      <Image
        src={imgUrl}
        alt="card-image"
        height={10}
        width={20}
        className=""
      />
      <div className="flex gap-2">
        <p>{text}</p>
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
