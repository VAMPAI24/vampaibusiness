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
              title="Collaborative Hiring"
              description="Share candidate profile and feedback with your team, making the hiring process more efficient and unified"
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
              title="Customizable Job Posts"
              description="Attract the best candidates with tailored job descriptions that reflect your company culture and expectations"
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
