"use client";

import React from "react";
import {
  Button,
  CandidateCard,
  Container,
  Heading,
} from "@/components/landingpage";
import { CandidateCardData } from "@/constants";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Candidate = () => {
  const router = useRouter();

  const toWaitlist = () => router.push("/waitlist");

  return (
    <Container>
      <Heading
        title="Your Ideal Candidate is Waiting"
        desc="Great hires don’t happen by chance, they happen with Vamp"
      />

      <div className="flex flex-wrap items-center justify-center gap-5 mt-16">
        {CandidateCardData.map((card, index) => (
          <CandidateCard key={index} {...card} />
        ))}
      </div>

      <div className="w-full flex items-center justify-center  mx-auto">
        <Button
          text="Start Hiring"
          imgIcon={<ArrowRight size={20} />}
          variant="bg-main-600 text-white rounded-full w-[150px] mt-[2em]"
          clickFn={toWaitlist}
        />
      </div>
    </Container>
  );
};

export default Candidate;
