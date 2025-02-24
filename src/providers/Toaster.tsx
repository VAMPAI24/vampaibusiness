import React from "react";
import { ShieldX, CircleCheck, InfoIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        unstyled: false, // true || false
        classNames: {
          error:
            "bg-[#DC2626] border border-[#DC2626] h-20 flex gap-3  text-sm",
          success:
            "bg-[#0061F9] border border-[#0061F9] h-20 flex gap-3 text-sm",
          warning: "text-yellow-400",
          info: "bg-blue-400",
        },
      }}
      icons={{
        success: <CircleCheck color="#2F90FA" />,
        error: <ShieldX color="#FF4D4F" />,
        info: <InfoIcon />,
        // warning: <WarningIcon />,
        // loading: <LoadingIcon />,
      }}
    />
  );
};

export default ToasterProvider;
