import React from 'react'
import { Button } from '../ui/button'
import { SubmitButtonProps } from '@/types'
import { PulseLoader } from 'react-spinners'

const SubmitButton = ({ isLoading, loadingText, className,  children }: SubmitButtonProps) => {
  return (
    <Button
    type="submit"
    disabled={isLoading}
    className={className ?? " text-white"}
  >
    {isLoading ? (
      <div className="flex items-center gap-4">
        <PulseLoader color="#ffffff" size="10" />
        {loadingText}
      </div>
    ) : (
      children
    )}
  </Button>
  )
}

export default SubmitButton