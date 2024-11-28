import React from 'react'





export interface JobDescriptionProps {
  title: string;
  description: string;
}

const JobDescription = ({title, description}: JobDescriptionProps) => {
  return (
    <div>
      <h2 className='text-main-901 font-rubik text-base'>{title}</h2>
      <p className='mt-2 text-main-902 font-jakarta text-xs'>{description}</p>
    </div>
  )
}

export default JobDescription
