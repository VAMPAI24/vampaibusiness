"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoBlue from "@/public/svgs/logo-blue.svg";
import { Container } from "@/components/landingpage";
import DemoCard from "./_components/demo-card";
import { InlineWidget } from "react-calendly";

const BookDemo = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="flex flex-row">
        <div className="flex flex-col w-2/3 ">
          <Image
            src={LogoBlue}
            alt="logo"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          <div className="mt-5">
            <h2 className="text-sec-901 font-semibold font-rubik text-[32px] mt-16">
              Let Us Give You a Tour
            </h2>
            <p className="w-[547px] text-[16px] text-main-901 font-jakarta mt-4">
              Book a demo today and see how our platform can transform your
              recruitment process, from posting jobs to finding top talent
              effortlessly
            </p>

            <div className="mt-10">
              <DemoCard
                title="Personalized Walkthrough"
                description="Get a customized tour based on your company's unique needswhether you're focused on job posting, talent matching, or analytics"
              />
              <DemoCard
                title="Live Q&A with Our Experts"
                description="Ask any questions in real-time during the demo to get immediate answers and insights into how the platform works for you"
              />
              <DemoCard
                title="Live Customization"
                description="Watch how we customize features and dashboards in real-time to fit your company’s workflow during the demo"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <InlineWidget url="https://calendly.com/temitayo-usevampai/vamp-coffee-chat" />
        </div>
      </div>
    </Container>
  );
};

export default BookDemo;
