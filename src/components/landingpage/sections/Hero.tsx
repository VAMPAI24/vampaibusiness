import React from "react";
import Image from "next/image";
import { Button, Container, HeaderBox } from "@/components/landingpage";
import { HeroData } from "@/constants";

const Hero = () => {
  return (
    <Container>
      <HeaderBox
        title={
          <>
            Hire <span className="text-main-500">Top Talents</span>
            &nbsp; <br /> 10x faster with Vamp.
          </>
        }
        description="Simplify your hiring process, reduce time-to-hire, and make confident decisions with access to a diverse pool of qualified candidates"
        variant="lg:w-[600px]"
      />

      <Button
        text="Get started"
        variant="bg-main-600 text-white rounded-lg w-[150px] mt-4"
      />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-10">
        {HeroData.map((card, index) => (
          <div key={index} className="mt-2">
            <div className="border-t-2 border-t-main-100 mb-4">{card.title}</div>
            <Image src={card.imgURL} alt="hero-image" />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Hero;
