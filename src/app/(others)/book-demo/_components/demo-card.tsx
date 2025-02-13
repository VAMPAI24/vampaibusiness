
import React from 'react'
import Image from 'next/image'
import Check from "@/public/svgs/book-demo/check-demo.svg"


interface DemoCardProps  {
  description: string,
  title: string 
}

const DemoCard = ({ description, title }: DemoCardProps) => {
  return (
    <div className='mt-10 flex items-start gap-3'>
        <Image src={Check} alt="demo-card"  />
        <div>
          <h2 className='text-sec-901 font-rubik text-[20px]'>{title}</h2>
          <p className='w-[550px] text-[14px] '>{description}</p>
        </div>
     </div>
  )
}

export default  DemoCard