"use client";
import { useState } from "react";
import { Button, Container } from "@/components/landingpage";
import Image from "next/image";
import Logo from "@/public/svgs/logo.svg";
import LogoBlue from "@/public/svgs/logo-blue.svg";
import { NavLinks } from "@/constants/index";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply, faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Container variant="-mt-6">
      <div className="flex items-center justify-between py-5 px-4 lg:px-8 rounded-xl bg-main-902">
        <div className="flex items-center gap-10 lg:gap-4 text-center">
          <Image
            src={Logo}
            alt="logo"
            width={120}
            height={50}
            className="cursor-pointer"
          />

          {/* Desktop Navigation */}
          <span className="hidden lgflex w-fit gap-8 text-white">
            {NavLinks.map((item, index) => (
              <Link href={item.link} key={index}>
                {item.name}
              </Link>
            ))}
          </span>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lgflex items-center justify-center -mt-4">
          <Button text="Login" variant="text-white rounded-lg w-[150px] mt-4" />
          <Button
            text="For Talent"
            variant="bg-main-600 text-white rounded-lg w-[150px] mt-4"
          />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className=" flex flex-col lg:hidden relative">
          <FontAwesomeIcon
            icon={toggle ? faMultiply : faBars}
            onClick={() => setToggle((prev) => !prev)}
            className="text-[1.5em] text-white cursor-pointer"
          />
        </div>
      </div>

      <div className="w-full px-10 relative">
        {toggle && (
          <div
            className={` ${
              toggle ? "flex lg:hidden" : "hidden"
            } mt-4 bg-white shadow-lg absolute top-0 w-full px-8 rounded-b-lg  right-0`}
          >
            <div className="flex flex-col justify-end mb-4 w-full h-full">
              <span className="flex flex-col w-full gap-4">
                {NavLinks.map((item, index) => (
                  <Link
                    href={item.link}
                    key={index}
                    className="border-b border-gray-300 pb-2 w-full"
                  >
                    <span className="block w-full">{item.name}</span>
                  </Link>
                ))}
              </span>
              <div className="flex items-start justify-center gap-4 mt-4">
                <Button
                  text="Login"
                  variant="text-black border rounded-lg w-[150px] mt-4"
                />
                <Button
                  text="For Talent"
                  variant="bg-main-600 text-white rounded-lg w-[150px] mt-4"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Navbar;

export const LogoNavbar = () => {
  const router = useRouter();

  return (
    <Container variant="-mt-6">
      <div className="flex items-center justify-between rounded-xl">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-center">
          <Image
            src={LogoBlue}
            alt="logo"
            width={120}
            height={50}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    </Container>
  );
};
