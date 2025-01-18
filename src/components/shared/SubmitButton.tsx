import React from 'react'
import { Button } from '../ui/button'
import { SubmitButtonProps } from '@/types'
import { PulseLoader } from 'react-spinners'

const SubmitButton = ({ disabled, isLoading, loadingText, className, clickFn,  children }: SubmitButtonProps) => {
  return (
    <Button
    type="submit"
    disabled={disabled || isLoading}
    className={className ?? " text-white"}
    onClick={clickFn}
  >
    {isLoading ? (
      <div className="flex items-center gap-4">
        <PulseLoader color="#ffffff" size="10px" />
        {loadingText}
      </div>
    ) : (
      children
    )}
  </Button>
  )
}

export default SubmitButton