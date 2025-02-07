"use client";

import { usePathname } from "next/navigation";
const PathnameDisplay = () => {
  const pathname = usePathname();

  const formattedPathname = pathname?.startsWith("/job-posting")
    ? "job posting"
    : pathname?.startsWith("/scheduleinterview")
    ? "Interviews"
    : pathname?.startsWith("/cv-screener")
    ? "CV Screener"
    : pathname?.replace(/^\//, "").replace(/-/g, " ") || "dashboard";
    
  return (
    <p className="hidden lg:flex capitalize text-[#001633] font-medium font-rubik text-[24px]">
      {formattedPathname}
    </p>
  );
};

export default PathnameDisplay;


