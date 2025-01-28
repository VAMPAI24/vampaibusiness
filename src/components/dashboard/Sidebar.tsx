"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import VampLogoSmall from "@/public/pngs/dashboard/v-logo-white.png";
import VampLogo from "@/public/svgs/auth/vamp-white.svg";
import { SidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLogout } from "@/redux/features/auth/authSlice";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      setTimeout(() => dispatch(userLogout()), 1000);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <section className="left-0 top-0 flex h-screen w-fit flex-col justify-between bg-main-600 text-white max-md:hidden p-6 2xl:w-[355px] relative">
      <nav className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="mb-12 px-3 flex items-center gap-2 cursor-pointer"
        >
          <Image
            src={VampLogoSmall}
            alt="vamp-logo-small"
            width={34}
            height={34}
            className="block lg:hidden"
          />
          <Image
            src={VampLogo}
            alt="vamp-logo-large"
            width={100}
            height={100}
            className="hidden lg:block"
          />
        </Link>

        {/* Sidebar Links */}
        {SidebarLinks.map((item, index) => {
          const isActive = pathname === item.route;
          const isLastItem = index === SidebarLinks.length - 1;

          return (
            <Link
              key={item.label}
              href={item.route}
              onClick={isLastItem ? handleLogout : undefined}
              className={cn(
                "flex gap-3 items-center py-1 p-2 lg:p-4 rounded-md justify-center lg:justify-start",
                {
                  "bg-red-50 py-[1em] w-fit rounded-full mt-20": isLastItem,
                  "bg-white": isActive && !isLastItem,
                }
              )}
            >
              <div className="relative w-6 h-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn(
                    { "brightness-0 invert-40": isActive && !isLastItem },
                    { "text-main-900": isLastItem }
                  )}
                />
              </div>
              <p
                className={cn(
                  "text-16 font-[300] text-white hidden lg:flex",
                  { "!text-main-600 font-[600] ": isActive && !isLastItem },
                  { "text-red-900 ": isLastItem }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Sidebar;
