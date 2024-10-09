"use client";
import React from "react";
import {
  Button,
  Container,
  HeaderBox,
  RecruitmentCard,
} from "@/components/landingpage";
import { RecruitmentData } from "@/constants/index";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

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

export const RecruitmentAAS = () => {
  const benefits: string[] = [
    "Sign a flexible contract tailored to your needs.",
    "Make a partial payment to kick things off.",
    "Sit back as we deliver a curated list of top-tier candidates.",
    "Pay the balance only when you're 100% satisfied.",
  ];

  const router = useRouter();

  return (
    <section className="w-full bg-sec-100  py-[50px] h-fit flex items-center justify-center">
      <Container>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[2em]">
          <div className="w-full col-span-1 flex flex-col items-start gap-[15px] ">
            <h5 className="my-0 text-[1em] leading-[1.2em]  font-[700] text-main-800 ">
              {/* RECRUITMENT AS A SERVICE */}
              Recruitment as a Service: Your Personal Hiring Buddy
            </h5>
            <p className="my-0 font-[300] text-main-902 text-[1.5emd] md:text-[2em]">
              Need a more hands-on approach? Let Vamp be your recruitment
              wingman:
            </p>

            <Button
              text="Get started"
              imgIcon={<ArrowRight size={20} />}
              variant="bg-main-600 text-white rounded-full w-[150px] mt-[5em]"
              clickFn={() => router.push("/waitlist")}
            />
          </div>
          <div className="w-full col-span-1 grid grid-cols-2 gap-[1em]">
            {benefits.map((item, id) => (
              <div
                key={id.toString()}
                className="w-full bg-white border-[1px] border-main-200 px-[30px] py-[25px] rounded-[15px] text-left max-h-[15em] h-[10em] col-span-1 flex flex-col items-start justify-between "
              >
                <p className="my-0 w-full font-[300] text-[2em] text-main-800">
                  {id < 10 ? 0 : ""}
                  {id + 1}
                </p>
                <span className="flex flex-col items-start text-left gap-[10px]">
                  <p className="my-0 font-[500] text-[1em] text-main-902 capitalize">
                    {item}
                  </p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
