import React from 'react'
import { ProfileBoxProps } from '@/types'

const ProfileBox = ({ title, description}: ProfileBoxProps) => {
  return (
    <div className='w-full sm:w-[318px]'>
        <h2 className='text-[#001633] font-rubik text-[24px] font-medium'>{title}</h2>
        <p className='text-main-901 text-[14px] font-jakarta'>{description}</p>
    </div>
  )
}

export default ProfileBox