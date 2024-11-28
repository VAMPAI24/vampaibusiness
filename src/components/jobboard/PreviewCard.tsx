import React from 'react'
import Image from "next/image";
import { PreviewCardProps } from '@/lib/schemas';




const PreviewCard = ({imgUrl, text}: PreviewCardProps ) => {
  return (
    <div className="flex gap-2 items-center justify-start">
      <Image
        src={imgUrl}
        alt="card-image"
        height={10}
        width={20}
        className=""
      />
      <p>{text}</p>
      </div>
  )
}

export default PreviewCard