"use client";

import React from "react";
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
      <div className="mt-10 flex flex-col lg:flex-row gap-5">
        {DashboardCardData.map((cardItem, index) => (
          <div
            key={index.toString()}
            onClick={() => router.push(cardItem.route)}
          >
            <DashboardCard {...cardItem} />
          </div>
        ))}
      </div>

      <div
        onClick={() => router.push("/profile")}
        className="cursor-pointer py-4 px-4 bg-main-700 mt-10 w-full lg:w-[400px]  rounded-[10px]"
      >
        <div className="flex justify-between">
          <Image src={Profile} alt="profile" width={35} height={30} />
          <Image src={Percentage} alt="profile" width={45} height={45} />
        </div>

        <div className="flex justify-start items-start py-4  gap-10 ">
          <div className="text-white">
            <h3 className="font-semibold text-[18px] mt-4">
              Complete your Profile
            </h3>
            <p className="text-xs font-jakarta mt-2">
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
