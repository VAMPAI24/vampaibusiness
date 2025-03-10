"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Profile from "@/public/svgs/dashboard/profile.svg";
import ArrowWhite from "@/public/svgs/dashboard/arrow-white.svg";
import { DashboardCardData } from "@/constants";
import { useRouter } from "next/navigation";
import { useGetProfilePercentageCountQuery } from "@/redux/features/job-posting/jobpostingApi";
import Cookies from "js-cookie";
import { CircularProgress } from "@/components/common/CircularProgress";
import { getStorage, getUserCountry } from "@/lib/utils";

const Dashboard = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const { data: percentageCount } = useGetProfilePercentageCountQuery(token);

  const isComplete = percentageCount?.data?.percentageCompletion;

  useEffect(() => {
    if (
      !getStorage<{ ipAddress: string }>("userAgent") ||
      getStorage<{ ipAddress: string }>("userAgent")?.ipAddress === "Not found"
    )
      getUserCountry();
  }, []);

  return (
    <section className="lg:mt-[1em]">
      {/* <div className="mt-10 flex flex-col lg:flex-row gap-5">
        {DashboardCardData.map((cardItem, index) => (
          <DashboardCard
            key={index.toString()}
            {...cardItem}
            clickFn={() => router.push(cardItem.route)}
          />
        ))}
      </div> */}

      <div className="mt-10 grid md:grid-cols-2 2xl:grid-cols-3 gap-[1em]">
        {DashboardCardData.map((cardItem, index) => (
          <DashboardCard
            key={index.toString()}
            {...cardItem}
            clickFn={() => router.push(cardItem.route)}
          />
        ))}
      </div>

      <div
        onClick={() => router.push("/profile")}
        className="cursor-pointer py-4 px-4 bg-main-700 mt-[1em] w-full lgw-[400px]  rounded-[1em]"
      >
        <div className="flex justify-between">
          <Image src={Profile} alt="profile" width={35} height={30} />
          <CircularProgress
            value={percentageCount?.data?.percentageCompletion}
            size={80}
            strokeWidth={10}
          />
        </div>

        <div className="flex justify-between items-center py-4  gap-10 ">
          <div className="text-white">
            <h3 className="font-semibold text-[18px] mt-4">
              {isComplete ? "Update your Profile" : "Complete your Profile"}
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
