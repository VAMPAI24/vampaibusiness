"use client";
import React from "react";
import { Container, SubHeading, Button } from "@/components/landingpage";
import Image from "next/image";
import HiringImg from "@/public/svgs/landing-page/hiring.svg";
import CutomizeJob from "@/public/svgs/landing-page/cutomize-job.svg";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Hiring = () => {
  const router = useRouter();

  const toWaitlist = () => router.push("/waitlist");

  return (
    <section className="bg-sec-100">
      <Container variant="">
        <div className="flex flex-col lg:flex-row gap-14">
          <div className="lg:w-4/6 lg:mt-10">
            <SubHeading
              header="Work together seamlessly"
              title="Hiring, But Make It a Team Sport"
              description="Don’t just hire alone, get your team involved. Vamp lets you share profiles, exchange feedback, and make hiring decisions together without the endless back-and-forth emails."
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
              src={HiringImg}
              alt="posing-image"
              width={529}
              height={381}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-14 mt-16">
          <div className="lg:w-3/6">
            <Image src={CutomizeJob} alt="posing-image" width={529} height={381} />
          </div>
          <div className="lg:w-4/6 lg:mt-10">
            <SubHeading
              header="Showcase your brand"
              title="Job Posts That Actually Attract Talent"
              description="Stand out with customisable posts that highlight what makes your company amazing and pull in the candidates who belong on your team."
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

export default Hiring;
