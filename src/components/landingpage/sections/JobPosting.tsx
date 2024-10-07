import React from "react";
import { Container, SubHeading, Button } from "@/components/landingpage";
import Image from "next/image";
import PostingImg from "@/public/svgs/posting-image.svg";
import { ArrowRight } from 'lucide-react';


const JobPosting = () => {
  return (
    <Container variant="lg:mb-12">
      <div className="flex flex-col lg:flex-row gap-14">
        <div className="lg:w-3/6">
          <Image src={PostingImg} alt="posing-image" width={529} height={381} />
        </div>

        <div className="lg:w-4/6">
          <SubHeading
            title="Customable Job Posting"
            description="Easily create personalized job listings that highlight your company’s unique culture, values, and vision. Craft job descriptions that not only attract the right talent but also showcase what sets your organization apart from the rest."
          />
          <Button text="Get started" imgIcon={<ArrowRight size={20} />} variant="bg-main-600 text-white rounded-full w-[150px]" />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-14 mt-16">
        <div className="lg:w-4/6">
          <SubHeading
            title="Streamlined Application Management"
            description="Easily create personalized job listings that highlight your company’s unique culture, values, and vision. Craft job descriptions that not only attract the right talent but also showcase what sets your organization apart from the rest."
          />
          <Button text="Learn More" imgIcon={<ArrowRight size={20} />} variant="bg-main-600 text-white rounded-full w-[150px]" />
        </div>
        <div className="lg:w-3/6">
          <Image src={PostingImg} alt="posing-image" width={529} height={381} />
        </div>
      </div>
    </Container>
  );
};

export default JobPosting;
