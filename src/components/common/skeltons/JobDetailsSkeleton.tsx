import React from 'react'

const JobDetailsSkeleton = () => {
  return (
    <div className="bg-white rounded-md p-4 mt-10 animate-pulse">
      {/* Job Title Skeleton */}
      <div className="h-8 bg-blue-500 rounded-md mb-4 w-3/4"></div>

      {/* Preview Cards Skeleton */}
      <div className="flex flex-wrap gap-5 sm:gap-3">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-main-200 p-3 rounded-md w-[160px] h-[80px]"
            >
              <div className="h-10 w-10 bg-main-400 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-main-400 rounded w-3/4"></div>
                <div className="h-3 bg-main-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
      </div>

      <hr className="my-4 bg-gray-200 h-0.5" />

      {/* Job Description Skeleton */}
      {Array(4)
        .fill("")
        .map((_, index) => (
          <div key={index} className="space-y-2 mb-4">
            <div className="h-4 bg-main-400 rounded w-1/2"></div>
            <div className="h-3 bg-main-300 rounded w-full"></div>
            <div className="h-3 bg-main-300 rounded w-full"></div>
            <div className="h-3 bg-main-300 rounded w-3/4"></div>
          </div>
        ))}
    </div>
  )
}

export default JobDetailsSkeleton
