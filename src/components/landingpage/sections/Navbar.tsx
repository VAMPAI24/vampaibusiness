// "use client";
// import { useState } from "react";
// import { Button, Container } from "@/components/landingpage";
// import Image from "next/image";
// import Logo from "@/public/svgs/logo.svg";
// import { NavLinks } from "@/constants/index";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMultiply,
//   faBars,
//   faChevronDown,
//   faChevronUp,
// } from "@fortawesome/free-solid-svg-icons";
// import Item from "antd/es/list/Item";

// const Navbar = () => {
//   const [toggle, setToggle] = useState(false);
//   const [active, setActive] = useState<number | null>(null);
//   return (
//     <Container variant="-mt-6">
//       <div className="flex items-center justify-between py-5 px-4 lg:px-8 rounded-xl bg-main-902 ">
//         <div className="flex items-center gap-10 lg:gap-4 text-center">
//           <Image
//             src={Logo}
//             alt="logo"
//             width={120}
//             height={50}
//             className="cursor-pointer"
//           />

//           <span className="hidden lg:flex w-fit gap-8 text-white">
//             {NavLinks.map((item, index) => (
//               <Link href={item.link} key={index}>
//                 {item.name}
//               </Link>
//             ))}
//           </span>
//         </div>

//         <div className="hidden lg:flex tems-center justify-center -mt-4">
//           <Button text="Login" variant="text-white rounded-lg w-[150px] mt-4" />
//           <Button
//             text="For Talent"
//             variant="bg-main-600 text-white rounded-lg w-[150px] mt-4"
//           />
//         </div>

//         {/* hamguger */}
//         <div className="relative">
//         {toggle &&
//         <div className="w-full !z-[100] lg:hidden h-[100vh] bg-white absolute mx-auto top-[100px] left-0 right-0">
//              <span className="relative w-ful flex flex-col gap-[30px] py-[40px] px-[30px]">
//              {NavLinks.map((item, index) => (
//               <Link href={item.link} key={index}>
//                 {item.name}
//               </Link>
//             ))}

//              </span>
//             </div>}
//         </div>

//         <div>
//           <FontAwesomeIcon
//             icon={toggle ? faMultiply : faBars}
//             onClick={() => setToggle((prev) => !prev)}
//             className="flex lg:!hidden my-0 text-[1.5em] text-main-600"
//           />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Navbar;

"use client";
import { useState } from "react";
import { Button, Container } from "@/components/landingpage";
import Image from "next/image";
import Logo from "@/public/svgs/logo.svg";
import { NavLinks } from "@/constants/index";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply, faBars } from "@fortawesome/free-solid-svg-icons";

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
          <span className="hidden lg:flex w-fit gap-8 text-white">
            {NavLinks.map((item, index) => (
              <Link href={item.link} key={index}>
                {item.name}
              </Link>
            ))}
          </span>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center justify-center -mt-4">
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
                  <Link href={item.link} key={index} className="border-b border-gray-300 pb-2 w-full">
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
