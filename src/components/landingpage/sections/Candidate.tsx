import React from "react";
import { CandidateCard, Container, Heading } from "@/components/landingpage";
import { CandidateCardData } from "@/constants";

const Candidate = () => {
  return (
    <Container>
      <Heading
        title="Your Ideal Candidate is Waiting"
        desc="Discover top talent, pre-vetted and ready to join your team."
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
