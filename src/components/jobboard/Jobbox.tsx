import React from 'react'
import { Pencil } from 'lucide-react';



interface JobboxProps {
  title?:string;
  description?: string;
  variant?: string;
  titleVariant?: string;
  descriptionVariant?: string;
  onEdit?: () => void; 

}

const Jobbox = ({title, description, variant, titleVariant, descriptionVariant, onEdit }: JobboxProps ) => {
  return (
    <div className={`${variant}`}>
      <div className='flex gap-2'>
      <h2 className={`${titleVariant} text-[#001633] font-medium font-rubik`}>{title}</h2>
      {onEdit && (
          <button onClick={onEdit} className="text-[#254E7D] hover:text-[#1a3a56] ml-2">
            <Pencil size={16} />
          </button>
        )}

      </div>
      
      <p className={`${descriptionVariant} text-[#002A62] font-jakarta`}>{description}</p>
    </div>
  )
}

export default Jobbox
