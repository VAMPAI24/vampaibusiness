"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvaterImg from "@/public/svgs/dashboard/avatar.svg";
import Image from "next/image";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Profile from "@/public/svgs/dashboard/profile.svg";
import Percentage from "@/public/svgs/dashboard/percentage.svg";
import ArrowWhite from "@/public/svgs/dashboard/arrow-white.svg";
import { DashboardCardData } from "@/constants";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <section className="lg:mt-16">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-start px-4 sm:p-0">
        <Avatar className="h-16 w-16">
          <Image
            src={AvaterImg}
            alt="@shadcn"
            width={64}
            height={64}
            className="rounded-full"
          />
          <AvatarFallback className="text-black">BT</AvatarFallback>
        </Avatar>

        <div className="text-center sm:text-left">
          <h2 className="font-rubik text-main-900 text-[20px] sm:text-[28px]">
            Hey there! I’m Mimi, your AI hiring assistant
          </h2>
          <p className="font-jakarta text-[#858CA0] text-[14px] sm:text-[16px]">
            Let’s find the perfect candidates for your team
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col lg:flex-row gap-5">
        {DashboardCardData.map((cardItem, index) => (
          <DashboardCard key={index} {...cardItem} />
        ))}
      </div>

      <div
        onClick={() => router.push("/profile")}
        className="cursor-pointer py-6 px-4 bg-main-700 mt-10 w-full lg:w-[390px]  rounded-[10px]"
      >
        <div className="flex justify-between">
          <Image src={Profile} alt="profile" width={35} height={30} />
          <Image src={Percentage} alt="profile" width={45} height={45} />
        </div>

        <div className="flex justify-start items-start mt-10 gap-10 ">
          <div className="text-white">
            <h3 className="font-semibold text-[18px]">Complete your Profile</h3>
            <p className="text-sm font-jakarta mt-2">
              Take the next step by completing your profile in one place.
              Providing detailed information will help you attract top talent
            </p>
          </div>

          <Image src={ArrowWhite} alt="arrow" />
        </div>
      </div>







      
    </section>
  );
};

export default Dashboard;
