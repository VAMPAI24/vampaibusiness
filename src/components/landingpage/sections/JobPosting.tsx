"use client";
import React from "react";
import { Container, SubHeading, Button } from "@/components/landingpage";
import Image from "next/image";
import ApplicantMatching from "@/public/svgs/landing-page/applicant-matching.svg";
import Insight from "@/public/svgs/landing-page/insight.svg";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const JobPosting = () => {
  const router = useRouter();

  const toWaitlist = () => router.push("/waitlist");
  return (
    <section className="bg-sec-100">
      <Container variant="lg:mb-12">
        <div className="flex flex-col lg:flex-row gap-14">
          <div className="lg:w-4/6 lg:mt-10">
            <SubHeading
              header="stop Searching, Start Hiring"
              title="AI Powered Job Applicant Matching"
              description="Our AI-driven system identifies relevant and engaged candidates based on your job descriptions, ensuring a perfect match for your needs."
            />
            <Button
              text="Learn More"
              imgIcon={<ArrowRight size={20} />}
              variant="bg-main-600 text-white rounded-full w-[150px] mt-[2em]"
              clickFn={toWaitlist}
            />
          </div>

          <div className="lg:w-3/6">
            <Image
              src={ApplicantMatching}
              alt="posing-image"
              width={529}
              height={381}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-14 mt-16">
          <div className="lg:w-3/6">
            <Image src={Insight} alt="posing-image" width={529} height={381} />
          </div>
          <div className="lg:w-4/6 lg:mt-10">
            <SubHeading
              header="know more, faster"
              title="Effortless Candidate Insights"
              description="Get detailed profiles with skills, experience, and engagement levels highlighted, making it easy to identify top talents in moments"
            />
            <Button
              text="Learn More"
              imgIcon={<ArrowRight size={20} />}
              variant="bg-main-600 text-white rounded-full w-[150px] mt-[2em]"
              clickFn={toWaitlist}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default JobPosting;
