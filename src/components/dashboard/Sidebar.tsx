"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import VampLogoSmall from "@/public/pngs/dashboard/v-logo.png";
import VampLogo from "@/public/svgs/auth/vamp-logo.svg";
import { SidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-main-100 text-white max-md:hidden p-6 2xl:w-[355px]">
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

        {SidebarLinks.map((item, index) => {
          const isActive = pathname === item.route;
          const isLastItem = index === SidebarLinks.length - 1;

          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn(
                "flex gap-3 items-center py-1 p-2 lg:p-4 rounded-md justify-center lg:justify-start",
                { "bg-main-600": isActive }
              )}
            >
              <div className="relative w-6 h-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({ "brightness-[35] invert-1": isActive })}
                />
              </div>

              <p
                className={cn(
                  "text-16 font-semibold text-main-900 hidden lg:flex",
                  { "!text-white": isActive },
                  { "text-red-500": isLastItem && !isActive }
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
