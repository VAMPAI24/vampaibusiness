"use client"
import React from "react";
import { Container, Button } from "@/components/landingpage";
import { useRouter } from "next/navigation";

const InterviewScheduling = () => {
  const router = useRouter();

  const toJobPosting= () => router.push("/job-posting");

  return (
    <Container variant="lg:py-28">
      <div className="relative mb-40 md:mb-20 lg:mb-0 w-full md:max-w-[75vw] 2xl:max-w-[100em] mx-auto">
        <div className="h-fit absolute inset-0 -top-8 lg:top-[-2em] text-center flex flex-col items-center bg-sec-100 rounded-[1em]  py-36 px-8 sm:px-12 lg:pt-[10em] lg:py-[3em]">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl w-full max-w-[700px] -mt-20 mb-6">
            Discover your Next Exceptional Hire with Ease and Speed
          </h3>
          <Button
            text="Post a Job"
            variant="bg-main-600 text-white rounded-lg w-[150px] sm:w-[200px]"
            clickFn={toJobPosting}
          />
        </div>
      </div>
    </Container>
  );
};

export default InterviewScheduling;
