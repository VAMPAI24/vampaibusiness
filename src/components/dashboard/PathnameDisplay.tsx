"use client";

import { usePathname } from "next/navigation";

const PathnameDisplay = () => {
    const pathname = usePathname()?.replace(/^\//, "") || "dashboard";

    return <p className="hidden lg:flex capitalize text-[#001633] font-medium font-rubik text-[24px]">{pathname}</p>;
}

export default PathnameDisplay
