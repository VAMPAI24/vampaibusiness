import React from 'react'



interface CvHeadersProps {
    title: string;
    description: string;
}

const CvHeaders = ({title, description}: CvHeadersProps) => {
  return (
    <div>
      <h1 className='text-[#001633] font-rubik font-medium text-2xl'>{title}</h1>
      <p className='text-[#002A62] font-jakarta font-normal text-base mt-1'>{description}</p>
      <hr className="mt-2 mb-5 bg-main-200" />
    </div>
  )
}

export default CvHeaders
