import * as React from "react"
import { cn } from "@/lib/utils"



interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode; 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, rightIcon, ...props }, ref) => {
    return (
      <div className={cn(`relative w-full`)}>
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        />
        {!!rightIcon && (
          <div className="absolute right-3 top-[50%] -translate-y-[50%]">
            {rightIcon}
          </div>
        )}
        </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
