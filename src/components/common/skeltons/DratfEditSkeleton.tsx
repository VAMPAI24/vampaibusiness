import React from 'react'

const DratfEditSkeleton = () => {
  return (
    <div className="bg-white rounded-md p-4 animate-pulse">
    <div className="h-8 bg-gray-300 mb-4 rounded"></div>
    <div className="flex gap-5 mb-4">
      <div className="w-24 h-24 bg-gray-300 rounded"></div>
      <div className="flex flex-col flex-grow gap-2">
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
    <hr className="my-4" />
    <div className="h-6 bg-gray-300 mb-4 rounded"></div>
    <div className="h-4 bg-gray-300 mb-4 rounded"></div>
    <div className="h-4 bg-gray-300 rounded"></div>
  </div>
  )
}

export default DratfEditSkeleton