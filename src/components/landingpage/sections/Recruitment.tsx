import React from "react";
import {
  Container,
  HeaderBox,
  RecruitmentCard,
} from "@/components/landingpage";
import { RecruitmentData } from "@/constants/index";

const Recruitment = () => {
  return (
    <section className="bg-main-100">
      <Container>
        <HeaderBox
          title="A Seamless Recruitment Journey for Effortless Hiring"
          description="Streamline your entire hiring process, from posting jobs to finding the perfect candidate, all with ease and efficiency."
          variant="text-center"
        />

        <div className="mx-auto flex flex-col lg:flex-row lg:justify-center gap-5 mt-8">
          {RecruitmentData.map((items, index) => (
            <RecruitmentCard key={index} {...items} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Recruitment;
