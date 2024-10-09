"use client"

import React from "react";
import { Container, SubHeading, Button } from "@/components/landingpage";
import Image from "next/image";
import Matching from "@/public/svgs/Matching.svg";
import Scheduling from "@/public/svgs/Scheduling.svg";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const InterviewScheduling = () => {
  const router = useRouter();

  const toWaitlist = () => router.push("/waitlist");

  return (
    <Container variant="lg:py-28">
      <div className="flex flex-col lg:flex-row gap-14">
        <div className="lg:w-3/6">
          <Image src={Scheduling} alt="posing-image" width={529} height={381} />
        </div>

        <div className="lg:w-4/6 lg:mt-[2em]">
          <SubHeading
            title="Integrated Interview Scheduling"
            description="Keep the interview process hassle-free. With built-in scheduling tools, coordinate interviews seamlessly and sync with your calendar to ensure you never miss a meeting with top candidates."
          />
          <Button
            text="Get started"
            imgIcon={<ArrowRight size={20} />}
            variant="bg-main-600 text-white rounded-full w-[150px] mt-[5em]"
            clickFn={toWaitlist}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-14 mt-10 lg:mt-16">
        <div className="lg:w-4/6 lg:mt-[2em]">
          <SubHeading
            title="AI Powered Candidate Matching"
            description="Let AI do the heavy lifting. Our smart algorithms match your job openings with the best candidates based on skills, experience, and potential fit, saving you time and boosting your chances of finding the right talent."
          />
          <Button
            text="Learn More"
            imgIcon={<ArrowRight size={20} />}
            variant="bg-main-600 text-white rounded-full w-[150px] mt-[5em]"
            clickFn={toWaitlist}
          />
        </div>
        <div className="lg:w-3/6">
          <Image src={Matching} alt="posing-image" width={529} height={381} />
        </div>
      </div>

      <div className="relative mt-20 mb-80 sm:mb-60  lg:mb-0 w-full md:max-w-[75vw] 2xl:max-w-[100em] mx-auto">
        <div className="h-fit absolute inset-0 -top-8 lg:top-[-2em] text-center flex flex-col items-center bg-sec-100 rounded-[1em]  py-36 px-8 sm:px-12 lg:pt-[10em] lg:py-[3em]">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl w-full max-w-[700px] -mt-20 mb-6">
            Discover your Next Exceptional Hire with Ease and Speed
          </h3>
          <Button
            text="Post a Job"
            variant="bg-main-600 text-white rounded-lg w-[150px] sm:w-[200px]"
          />
        </div>
      </div>
    </Container>
  );
};

export default InterviewScheduling;
