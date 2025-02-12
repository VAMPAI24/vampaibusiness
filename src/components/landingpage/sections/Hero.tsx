"use client";
import React, { useEffect, useRef, useState } from "react";
import { Container, Button } from "@/components/landingpage";
import { useRouter } from "next/navigation";
import { BrandCarouselImage } from "@/constants";
import PersonCard from "@/components/landingpage/PersonCard";
import { heroProfilesL, heroProfilesR } from "@/lib/data";
import { gsap } from "gsap";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();

  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  const [isClient, setIsClient] = useState(true); // Ensure client-side rendering

  useEffect(() => {
    setIsClient(true); // Mark as client-side

    const restartAnimation = () => {
      if (typeof window === "undefined") return; // Prevent server errors

      const isMobileOrTablet = window.innerWidth <= 1550;

      gsap.killTweensOf(leftColumnRef.current);
      gsap.killTweensOf(rightColumnRef.current);

      if (leftColumnRef.current) {
        gsap.fromTo(
          leftColumnRef.current,
          { x: 0, y: 0 },
          {
            [isMobileOrTablet ? "x" : "y"]: `${
              isMobileOrTablet
                ? leftColumnRef.current.scrollWidth / 2
                : leftColumnRef.current.scrollHeight / 2
            }px`,
            duration: 100,
            ease: "linear",
            repeat: -1,
            yoyo: true,
          }
        );
      }

      if (rightColumnRef.current) {
        gsap.fromTo(
          rightColumnRef.current,
          { x: 0, y: 0 },
          {
            [isMobileOrTablet ? "x" : "y"]: `-${
              isMobileOrTablet
                ? rightColumnRef.current.scrollWidth / 2
                : rightColumnRef.current.scrollHeight / 2
            }px`,
            duration: 100,
            ease: "linear",
            repeat: -1,
            yoyo: true,
          }
        );
      }
    };

    restartAnimation();

    const handleResize = () => {
      restartAnimation();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.killTweensOf(leftColumnRef.current);
      gsap.killTweensOf(rightColumnRef.current);
    };
  }, []);






  

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      const totalWidth = Array.from(
        carousel.children as HTMLCollectionOf<HTMLElement>
      ).reduce((acc, child) => acc + child.offsetWidth, 0);
      gsap.fromTo(
        carousel,
        { x: 0 },
        {
          x: -totalWidth,
          duration: 400,
          ease: "none",
          repeat: -1,
        }
      );
    }
  }, []);

  if (!isClient) return null;
  return (
    <Container>
      <div className="flex flex-col 2xl:flex-row items-center justify-between gap-8 2xl:gap-5 overflow-hidden ">
        {/* Text Content */}
        <div className="w-full 2xl:w-1/2 text-center 2xl:text-left px-4 2xl:-mt-36">
          <h1 className="font-rubik font-semibold text-[2.5em] md:text-[4em] lg:text-[4.75em] 2xl:w-[600px] leading-[1.3em] md:leading-[1.2em] lg:leading-[1em] text-sec-901 mb-4">
            Hire <span className="text-main-700">Top Talents</span> <br />
            10x faster with Vamp.
          </h1>

          <p className="font-jakarta text-sec-901 font-light leading-[1.5em] text-[16px] md:text-[18px] lg:text-[18px]  2xl:w-[500px]  mx-auto lg:mx-0">
            Finding great talent shouldn’t feel like finding needles in
            haystacks. Vamp makes it ridiculously easy to connect with
            candidates who are ready to make an impact
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center 2xl:justify-start mt-6">
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
            <p className="font-jakarta text-[18px] text-main-901">
              Smart Hiring Trusted by Innovative Companies
            </p>
            <div className="flex items-center gap-[1em] mt-5 overflow-hidden">
              <div ref={carouselRef} className="flex items-center gap-[2em]">
                {Array(50)
                  .fill(BrandCarouselImage)
                  .flat()
                  .map((image, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Image
                        src={image.imgUrl.src}
                        alt={image.id.toString()}
                        className=" h-[2em] object-contain"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className=" w-screen flex flex-col 2xl:flex-row justify-end gap-6 h-fit h[700px] 2xl:h-[850px] 2xl:w-1/2 px4 py-10 bgslate-50 rounded-lg overflow-hidden">
          {/* First Column with Auto Scroll */}
          <div
            ref={leftColumnRef}
            className="flex flex-row 2xl:flex-col items-center justify-center h-full gap-4 overflowhidden flex-nowrap autoscroll"
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
            className="flex flex-row 2xl:flex-col h-full gap-4 overflowhidden   2xl:mt-[-5em]"
          >
            {Array(20)
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
