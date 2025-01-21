import React from 'react'

const OverviewSkelton = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md py-10 px-4 w-full mx-auto opacity-50">
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-blue-300 h-10 w-10 opacity-50"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-main-300 rounded opacity-50"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-main-300 rounded col-span-2 opacity-50"></div>
          <div className="h-2 bg-main-300 rounded col-span-1 opacity-50"></div>
        </div>
        <div className="h-2 bg-main-300 rounded opacity-50"></div>
      </div>
    </div>
  </div>
</div>

  )
}

export default OverviewSkelton

