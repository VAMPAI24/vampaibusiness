import React from "react";
import { Container } from "@/components/landingpage";
import vesti from "@/public/pngs/brands/vesti.png";
import fez from "@/public/pngs/brands/fez.png";
import coven from "@/public/pngs/brands/coven.png";
import agile from "@/public/pngs/brands/agile.png";
import shalom from "@/public/pngs/brands/shalom.png";
import elec from "@/public/pngs/brands/firstelec.png";
import tuboh from "@/public/pngs/brands/tuboh.png"
import realTec from "@/public/pngs/brands/realtec.png";
import medics from "@/public/pngs/brands/medics.png";
import Image from "next/image";

const TrustedCompanies = () => {
  return (
    <Container variant="!mx-auto flex flex-col gap-[2em] !items-center">
      <div className="flex flex-col mx-auto items-center">
        <h3 className="font-rubik text-2xl md:text-[2em] w-full text-center font-[700] text-sec-901">
          Brands That Trust Us
        </h3>
        <p className="font-jakarta text-center font-normal txt-[18px]  text-sec-901">
          Join a growing network of companies that rely on our platform to
          connect with top talent
        </p>
      </div>

      <div className="w-full 2xl:w-[80%] overflow-x-scroll md:overflow-x-none hide-scrollbar flex md:flex-wrap md:items-center md:justify-center gap-[1em]">
        {[vesti, fez, coven, agile, shalom, elec, tuboh, realTec, medics].map(
          (item, id) => (
            <div
              key={id.toString()}
              className="min-w-[100px] md:min-w-[200px] flex items-center justify-center  h-[100px]"
            >
              <Image className="w-[80px] md:w-[100px]" src={item} alt={id.toString()} />
            </div>
          )
        )}
      </div>
    </Container>
  );
};

export default TrustedCompanies;
