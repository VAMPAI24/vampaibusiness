import React from 'react'
import Image from 'next/image'

const brandcarousel = ({imgUrl}: { imgUrl: string}) => {
  return (
    <div>
      <Image src={imgUrl} alt='brands-images' width={500} height={500} />
    </div>
  )
}

export default brandcarousel
