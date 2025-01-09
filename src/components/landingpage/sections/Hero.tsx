"use client";
import React from "react";
import { Container, Button, BrandCarousel } from "@/components/landingpage";
import { useRouter } from "next/navigation";
import { BrandCarouselImage } from "@/constants";
import Tola from "@/public/svgs/landing-page/tola.svg";
import Olaoluwa from "@/public/svgs/landing-page/olaoluwa.svg";
import Abigail from "@/public/svgs/landing-page/Abigail.svg";
import Anne from "@/public/svgs/landing-page/anne.svg";
import Feranmi from "@/public/svgs/landing-page/feranmi.svg";
import Tolu from "@/public/svgs/landing-page/tola.svg";
import PersonCard from "@/components/landingpage/PersonCard";

const Hero = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-5">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4 lg:-mt-36">
          <h1 className="font-rubik font-semibold text-[2.5em] md:text-[4em] lg:text-[5em] lg:w-[600px] leading-[1.3em] md:leading-[1.2em] lg:leading-[1em] text-sec-901 mb-4">
            Hire <span className="text-main-700">Top Talents</span> <br />
            10x faster with Vamp.
          </h1>

          <p className="font-jakarta text-sec-901 font-light leading-[1.5em] text-[16px] md:text-[18px] lg:text-[18px]  lg:w-[500px]  mx-auto lg:mx-0">
            Simplify your hiring process, reduce time-to-hire, and make
            confident decisions with access to a diverse pool of qualified
            candidates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
            <Button
              text="Get started"
              variant="bg-main-700 text-white rounded-md w-full sm:w-[150px] h-[3em]"
              clickFn={() => router.push("/sign-up")}
            />
            <Button
              text="Book a Demo"
              variant="bg-main-100 text-main-800 rounded-md w-full sm:w-[150px] h-[3em]"
              clickFn={() => router.push("/sign-up")}
            />
          </div>

          <div className="mt-10 font-jakarta  text-[18px] text-main-901">
            <p className="font-jakarta text-[18px] text-main-901">Trusted by</p>
            <div className="flex gap-5 mt-5">
              {BrandCarouselImage.map((brands, index) => (
                <BrandCarousel key={index} {...brands} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex gap-6 h-[700px] lg:h-[850px] lg:w-1/2 px-4 py-10 bg-slate-50 rounded-lg overflow-hidden">
          {/* First Column with Auto Scroll */}
          <div className="flex flex-col h-full gap-4 overflow-hidden auto-scroll">
            <PersonCard
              src={Tola}
              name="Tola Kunle"
              role="Art Director"
              alt="Tola"
            />
            <PersonCard
              src={Olaoluwa}
              name="Olaoluwa Yomi"
              role="Backend Developer"
              alt="Olaoluwa"
            />
            <PersonCard
              src={Abigail}
              name="Abigail Chika"
              role="Customer Success"
              alt="Abigail"
            />
          </div>

          {/* Second Column with Auto Scroll */}
          <div className="flex flex-col h-full gap-4 overflow-hidden auto-scroll reverse-scroll">
            <PersonCard
              src={Anne}
              name="Anne Katie"
              role="Graphics Designer"
              alt="Anne"
            />
            <PersonCard
              src={Feranmi}
              name="Feranmi Tobi"
              role="HR Manager"
              alt="Feranmi"
            />
            <PersonCard
              src={Tolu}
              name="Tolu Oluwafemi"
              role="QA Tester"
              alt="Tolu"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
