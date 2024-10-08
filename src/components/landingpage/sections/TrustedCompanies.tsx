import React from "react";
import { Container } from "@/components/landingpage";

const TrustedCompanies = () => {
  return (
    <Container variant="!mx-auto flex flex-col gap-[2em] !items-center">
      <div className="flex flex-col mx-auto items-center">
        <h3 className="font-rubik font-semibold text-[25px] text-sec-901">
          Trusted Companies
        </h3>
        <p className="font-jakarta font-normal txt-[18px]  text-sec-901"></p>
      </div>

      <div className="w-full overflow-x-scroll hide-scrollbar flex gap-[1em]">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item, id) => (
          <div
            key={id.toString()}
            className="bg-main-100 min-w-[200px]  h-[100px]"
          ></div>
        ))}
      </div>
    </Container>
  );
};

export default TrustedCompanies;
