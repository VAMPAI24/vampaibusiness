import React from "react";
import { Button, Container } from "@/components/landingpage";
import { footerLinks, footerSocial } from "@/constants";
import EmailIcon from "@/public/svgs/email-icon.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <section className="bg-main-902">
      <Container variant="py-36 px-6 text-white mt-28 lg:mt-16">
        <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
          <div className="flex flex-1 justify-between lg:gap-5 gap-20 flex-wrap">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-jakarta text-2xl leading-normal font-medium mb-2 text-white">
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      className="mt-3 font-jakarta text-base leading-normal text-white-400 hover:text-slate-gray"
                      key={link.name}
                    >
                      <a href={link.link}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <span className="max-w-full md:max-w-[60%] lg:max-w-[450px] flex flex-col gap-[20px]">
            <h3 className="font-rubik font-[400] text-white text-[1em] md:text-[2em] leading-[1.4em]">
              Stay up-to-date with{" "}
              <strong className="text-main-600 font-[400]">
                Job search hacks
              </strong>
              ,{" "}
              <strong className="text-main-600 font-[400]">
                Interview tips
              </strong>
              , and lots more.
            </h3>

            <div className="flex items-center w-full relative">
              <input
                type="text"
                placeholder="Email Address"
                className="w-full border-b border-sec-100 text-main-600 outline-none bg-transparent placeholder-gray-500 relative"
              />
              <Image
                src={EmailIcon}
                alt="email-icon"
                width={22}
                height={22}
                className="absolute right-1"
              />
            </div>
          </span>
        </div>

        <div className="py-10 flex flex-col lg:flex-row justify-between">
          <div className="flex items-center gap-[1em]">
            <p className="font-jarkata font-[300] text-white text-[1em] whitespace-nowrap">
              Want to try it out ?
            </p>
            <Button
              text="Get Started For Free"
              variant="bg-main-600 text-white rounded-lg w-[200px]"
            />
          </div>

          <span className="flex w-fit gap-[20px] mt-10 lg:mt-0 cursor-pointer">
            {footerSocial.map((item, index) => (
              <Link
                key={index.toString()}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="social-icon"
                  src={item.icon}
                  width={30}
                  height={30}
                  className="w-auto"
                />
              </Link>
            ))}
          </span>
        </div>

        <div>
          <p className="font-jakarta text-base font-normal mt-4">
            &copy; {currentYear} 2024 VampAI, Inc. All rights reserved.
          </p>
          <p className="font-jakarta mt-4 text-sm font-normal">
            We use cookies and similar technologies to enhance your interactions
            with our website and Services, including when you reach out to us on
            chat. This comprises traffic analysis, delivering personalized
            content, and supporting our marketing efforts. By accessing our
            website, interacting with our Services, you agree to let us and our
            partners employ cookies and related technologies on your computer or
            devices
          </p>
          <p className="mt-8 font-jakarta text-sm">
            Click the Cookies Policy to check how you can control the use of
            cookies through your device. To understand how we process your data,
            including through cookies, and interactions with us, please read our
            Privacy Policy.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
