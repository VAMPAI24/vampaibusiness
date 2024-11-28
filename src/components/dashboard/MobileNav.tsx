"use client";

import { SidebarLinksMobile } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLogout } from "@/redux/features/auth/authSlice";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Hamburger from "@/public/svgs/dashboard/hamburger.svg";
import VampLogo from "@/public/svgs/auth/vamp-logo.svg";

const MobileNav = () => {
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
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Image
            src={Hamburger}
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={VampLogo}
              alt="vamp-logo-large"
              width={100}
              height={100}
            />
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-12 text-white">
                {SidebarLinksMobile.map((item, index) => {
                  const isActive = pathname === item.route;
                  const isLastItem = index === SidebarLinksMobile.length - 1;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        onClick={isLastItem ? handleLogout : undefined} 
                        // className={`flex gap-3 items-center p-4 rounded-lg w-full max-w-60 ${isActive? "bg-bank-gradient" : ""}`}
                        className={cn(
                          "flex gap-3 items-center p-4 rounded-lg w-full max-w-60",
                          { "bg-main-600": isActive }
                        )}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[40] invert-0": isActive,
                          })}
                        />

                        <p
                          className={cn("text-16 font-semibold text-main-900", {
                            "text-white": isActive,
                            "text-red-500": isLastItem && !isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
