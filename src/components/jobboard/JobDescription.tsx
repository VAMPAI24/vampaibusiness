import React from 'react'
import { Pencil } from "lucide-react";




export interface JobDescriptionProps {
  title: string;
  description: string;
  onEdit?: () => void;
}

const JobDescription = ({title, description, onEdit}: JobDescriptionProps) => {
  return (
    <div>
      <div className='flex gap-2'>
      <h2 className='text-main-901 font-rubik text-base'>{title}</h2>
      {onEdit && (
          <button
            onClick={onEdit}
            className="text-main-902 hover:text-main-800 ml-2"
          >
            <Pencil size={16} />
          </button>
        )}

      </div>
     
      <p className='mt-2 text-main-902 font-jakarta break-words text-xs'>{description}</p>
    </div>
  )
}

export default JobDescription
