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
              title="AI-Powered Talent Ranking"
              description="You don't need to sift through piles of applications! Our AI-driven system evaluates every application and delivers a ranked list of top candidates tailored to your job requirements. Spend less time searching and more time hiring the best."
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
              header="MAKE SMARTER DECISIONS, FASTER"
              title="Candidate Insights at a Glance"
              description="Know your candidates like never before. Vamp delivers real, actionable insights into their skills, experiences, and unique strengths. It’s the hiring edge you’ve been waiting for."
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
