import React from "react";
import { Pencil } from "lucide-react";

export interface JobDescriptionProps {
  title: string;
  description: string;
  onEdit?: () => void;
}

const JobDescription = ({
  title,
  description,
  onEdit,
}: JobDescriptionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-0">
        <h2 className="text-main-902 font-[500] font-rubik text-[1em] my-0">{title}</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-main-902 hover:text-main-800 ml-2"
          >
            <Pencil size={16} />
          </button>
        )}
      </div>

      <p className="mt[.5em] my-0 text-main-901 font-jakarta break-words text-[.75em] leading-[1.7em]">
        {description}
      </p>
    </div>
  );
};

export default JobDescription;
