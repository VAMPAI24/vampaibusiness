"use client";
import React, { useEffect, useRef } from "react";
import { Container, Button, BrandCarousel } from "@/components/landingpage";
import { useRouter } from "next/navigation";
import { BrandCarouselImage } from "@/constants";
import PersonCard from "@/components/landingpage/PersonCard";
import { heroProfilesL, heroProfilesR } from "@/lib/data";
import { gsap } from "gsap";

const Hero = () => {
  const router = useRouter();

  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the first column
    if (leftColumnRef.current) {
      gsap.to(leftColumnRef.current, {
        y: `-${leftColumnRef.current.scrollHeight / 2}px`,
        duration: 100,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });
    }

    // Animate the second column in reverse
    if (rightColumnRef.current) {
      gsap.to(rightColumnRef.current, {
        y: `-${rightColumnRef.current.scrollHeight / 2}px`,
        duration: 150,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <Container>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-5">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4 lg:-mt-36">
          <h1 className="font-rubik font-semibold text-[2.5em] md:text-[4em] lg:text-[4.75em] lg:w-[600px] leading-[1.3em] md:leading-[1.2em] lg:leading-[1em] text-sec-901 mb-4">
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
            <div className="flex items-center gap-5 mt-5">
              {BrandCarouselImage.map((brands, index) => (
                <BrandCarousel key={index} {...brands} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end gap-6 h-[700px] lg:h-[850px] lg:w-1/2 px4 py-10 bgslate-50 rounded-lg overflow-hidden">
          {/* First Column with Auto Scroll */}
          <div
            ref={leftColumnRef}
            className="flex flex-col h-full gap-4 overflowhidden autoscroll"
          >
            {Array(20)
              .fill(heroProfilesL)
              .flat()
              .map((profile, index) => (
                <PersonCard
                  key={index.toString()}
                  src={profile.image}
                  name={profile.name}
                  role={profile.role}
                  alt={profile.name}
                />
              ))}
          </div>

          {/* Second Column with Auto Scroll */}
          <div
            ref={rightColumnRef}
            className="flex flex-col h-full gap-4  mt-[-5em]"
          >
            {Array(50)
              .fill(heroProfilesR)
              .flat()
              .map((profile, index) => (
                <PersonCard
                  key={index.toString()}
                  src={profile.image}
                  name={profile.name}
                  role={profile.role}
                  alt={profile.name}
                />
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
