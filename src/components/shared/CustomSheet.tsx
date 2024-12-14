import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from "@/lib/utils";

export interface CustomSheetProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right" | null; 
}

const CustomSheet = ({ isOpen,
    onClose,
    title,
    description,
    footer,
    children,
    className,
    side = "right", }: CustomSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose} modal={true}>
      <SheetContent side={side} className={cn(``, className)}>
        {/* <Image alt='pattern' src={Pattern} className='absolute -top-0 h-30' /> */}

        <SheetHeader>
          {!!title && <SheetTitle>{title}</SheetTitle>}

          {/* Description */}
          {!!description && (
            <SheetDescription>
              Anyone who has this link will be able to view this.
            </SheetDescription>
          )}
        </SheetHeader>

        {children}

        {/* Footer */}
        {!!footer && (
          <SheetFooter className="sm:justify-start">{footer}</SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
