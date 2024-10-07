import React from "react";
import {
  Container,
  SubHeading,
  Button,
} from "@/components/landingpage";
import Image from "next/image";
import Matching from "@/public/svgs/Matching.svg";
import Scheduling from "@/public/svgs/Scheduling.svg";
import { ArrowRight } from "lucide-react";

const InterviewScheduling = () => {
  return (
    <Container variant="lg:py-28">
      <div className="flex flex-col lg:flex-row gap-14">
        <div className="lg:w-3/6">
          <Image src={Scheduling} alt="posing-image" width={529} height={381} />
        </div>

        <div className="lg:w-4/6">
          <SubHeading
            title="Integrated Interview Scheduling"
            description="Easily create personalized job listings that highlight your company’s unique culture, values, and vision. Craft job descriptions that not "
          />
          <Button
            text="Get started"
            imgIcon={<ArrowRight size={20} />}
            variant="bg-main-600 text-white rounded-full w-[150px]"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-14 mt-10 lg:mt-16">
        <div className="lg:w-4/6">
          <SubHeading
            title="AI Powered Candidate Matching"
            description="Easily create personalized job listings that highlight your company’s unique culture, values, and vision. Craft job descriptions that not only attract the right talent but also showcase what sets your organization apart from the rest."
          />
          <Button
            text="Learn More"
            imgIcon={<ArrowRight size={20} />}
            variant="bg-main-600 text-white rounded-full w-[150px]"
          />
        </div>
        <div className="lg:w-3/6">
          <Image src={Matching} alt="posing-image" width={529} height={381} />
        </div>
      </div>

      <div className="relative mt-20 w-full max-w-[900px] mx-auto">
        <div className="absolute inset-0 -top-16 lg:top-5 text-center flex flex-col items-center bg-sec-100 lg:py-28 py-36 px-8 sm:px-12">
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
