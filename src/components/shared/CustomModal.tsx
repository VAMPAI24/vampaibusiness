import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CustomModalProps } from "../../types/index";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  description,
  footer,
  children,
  className,
}: CustomModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent className={cn(`sm:max-w-lg`, className)}>
        <DialogHeader>
          {title ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            <DialogTitle className="sr-only">Modal</DialogTitle>
          )}

          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        {children}

        {footer && (
          <DialogFooter className="sm:justify-start">{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;

