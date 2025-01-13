import React from "react";
import { CandidateCard, Container, Heading } from "@/components/landingpage";
import { CandidateCardData } from "@/constants";

const Candidate = () => {
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
    </Container>
  );
};

export default Candidate;
