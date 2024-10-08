import { RecruitmentCardProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const RecruitmentCard = ({imgURL, title, subtitle }: RecruitmentCardProps) => {
  return (
    <div className='flex flex-col bg-white p-4 rounded-lg lg:w-[408px] lg:h-[214px]'>
      <Image src={imgURL} alt="card-image" width={50} height={50} />
      <h3 className='mt-4 font-rubik font-medium text-xl text-sec-901'>{title}</h3>
      <p className='mt-2 font-jakarta font-light text-sm text-sec-901'>{subtitle}</p>
    </div>
  )
}

export default RecruitmentCard
