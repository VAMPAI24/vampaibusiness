import React from 'react'



interface JobboxProps {
  title?:string;
  description?: string;
  variant?: string;
  titleVariant?: string;
  descriptionVariant?: string;

}

const Jobbox = ({title, description, variant, titleVariant, descriptionVariant }: JobboxProps ) => {
  return (
    <div className={`${variant}`}>
      <h2 className={`${titleVariant} text-[#001633] font-medium font-rubik`}>{title}</h2>
      <p className={`${descriptionVariant} text-[#002A62] font-jakarta`}>{description}</p>
    </div>
  )
}

export default Jobbox
