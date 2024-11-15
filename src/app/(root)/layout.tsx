import Image from "next/image";
import { MobileNav, Sidebar } from "@/components/dashboard";
import AdminProtected from "@/hooks/AdminProtected";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <AdminProtected>
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

      </div>
    </main>

  // </AdminProtected>
   
  );
}
