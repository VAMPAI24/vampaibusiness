"use client";
import React from "react";
import { Container, SubHeading, Button } from "@/components/landingpage";
import Image from "next/image";
import PostingImg from "@/public/svgs/posting-image.svg";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const JobPosting = () => {
  const router = useRouter();

  const toWaitlist = () => router.push("/waitlist");
  return (
    <Container variant="lg:mb-12">
      <div className="flex flex-col lg:flex-row gap-14">
        <div className="lg:w-3/6">
          <Image src={PostingImg} alt="posing-image" width={529} height={381} />
        </div>

        <div className="lg:w-4/6 lg:mt-[2em]">
          <SubHeading
            title="Customable Job Posting"
            description="Easily create personalized job listings that highlight your company’s unique culture, values, and vision. Craft job descriptions that not only attract the right talent but also showcase what sets your organization apart from the rest."
          />
          <Button
            text="Get started"
            imgIcon={<ArrowRight size={20} />}
            variant="bg-main-600 text-white rounded-full w-[150px] mt-[5em]"
            clickFn={toWaitlist}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-14 mt-16">
        <div className="lg:w-4/6 lg:mt-[2em]">
          <SubHeading
            title="Streamlined Application Management"
            description="Say goodbye to cluttered spreadsheets. Manage all your applications in one place with a clear and organised dashboard. Track every candidate's progress effortlessly and focus on finding the perfect fit faster."
          />
          <Button
            text="Learn More"
            imgIcon={<ArrowRight size={20} />}
            variant="bg-main-600 text-white rounded-full w-[150px] mt-[5em]"
            clickFn={toWaitlist}
          />
        </div>
        <div className="lg:w-3/6">
          <Image src={PostingImg} alt="posing-image" width={529} height={381} />
        </div>
      </div>
    </Container>
  );
};

export default JobPosting;
