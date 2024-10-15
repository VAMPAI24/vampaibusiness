import React from 'react'
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoBlue from "@/public/svgs/logo-blue.svg";

const WaitlistNavbar = () => {
    const router = useRouter();
  return (
    <div className="flex items-center justify-between rounded-xl px-6 mx-auto container py-6">
    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-center">
      <Image
        src={LogoBlue}
        alt="logo"
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
    </div>
  </div>
  )
}

export default WaitlistNavbar



