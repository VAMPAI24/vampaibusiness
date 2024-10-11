"use client";
import React from "react";
import Image from "next/image";
import { Button, Container } from "@/components/landingpage";
import { HeroData } from "@/constants";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <Container>
      <div className="lg:w-[800px] 2xl:w-[80em] mx-auto flex flex-col text-center items-center gap-[1em]">
 
        <h1 className="font-rubik font-[800] text-[2em] md:text-[5em] leading-[1.2em] md:leading-[1em] text-sec-901 mb-4">
          Hire <span className="text-main-500">Top Talents</span> <br />
          10x faster with Vamp.
        </h1>

        <p className="md:w-[70%] 2xl:w-[50%]  font-jakarta text-sec-901 font-[300] leading-[1.2em] text-[1.25em]">
          Simplify your hiring process, reduce time-to-hire, and make confident
          decisions with access to a diverse pool of qualified candidates
        </p>

        <Button
          text="Get started"
          variant="bg-main-600 text-white rounded-lg w-[250px] h-[5em] mt-[2.5em]"
          clickFn={() => router.push("/waitlist")}
        />
      </div>

      <div className="mt-[5em] grid  place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-5">
        {HeroData.map((card, index) => (
          <div key={index} className="mt-2">
            <div className="border-t-2 border-t-main-100 mb-4">
              {card.title}
            </div>
            <Image src={card.imgURL} alt="hero-image" />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Hero;
