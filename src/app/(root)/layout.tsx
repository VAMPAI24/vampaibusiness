import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import { ShieldX, CircleCheck, InfoIcon } from "lucide-react";
import { MobileNav, Sidebar } from "@/components/dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-screen h-screen font-inter no-scrollbar">
      <div className="h-full sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 w-full flex items-center justify-between  p-5  sm:p-8  border-b border-gray-200 bg-white z-50">
          <p className="hidden lg:flex">helloo</p>
          <MobileNav />
          <Image src="/icons/logo.svg" width={50} height={50} alt="logo" />
        </div>

        <div className="flex-1 overflow-auto no-scrollbar px-8 py-6 bg-[#F9FAFB]">
          {children}
        </div>
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
            // info: <InfoIcon />,
            // warning: <WarningIcon />,
            // loading: <LoadingIcon />,
          }}
        />
      </div>
    </main>
  );
}
