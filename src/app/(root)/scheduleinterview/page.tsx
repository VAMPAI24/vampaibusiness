/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useGetAllEventQuery } from "@/redux/features/job-posting/jobpostingApi";
import { BallsLoader } from "@/components/ui/BallsLoader";
import { openExternalLink } from "@/lib/utils";
import { Platformbtn } from "@/components/common/buttons";

const ScheduleInterview = () => {
  // Fetch Event Data
  const { data: eventData, isLoading: loadEvents } = useGetAllEventQuery(
    {
      max_result: 200,
    },
    { refetchOnMountOrArgChange: true }
  );

  // console.log(eventData)
  const isEmpty = !eventData?.data || eventData.data.length === 0;

  useEffect(() => {
    // console.log(eventData);
    // refetch();
  }, []);

  return (
    <div className="w-full mx-auto flex items-center justify-center">
      {loadEvents ? (
        <div className="w-fit flex flex-col items-center gap-[.5em]">
          <BallsLoader />
          <p className="text-[.875em] text-main-900 text-center">
            Loading Events...
          </p>
        </div>
      ) : isEmpty ? (
        <div className="w-full flex flex-col items-center text-center gap-[.5em]">
          <p className="text-[1.25em] text-gray-700 font-semibold">
            No Events Available
          </p>
          <p className="text-sm text-gray-500">
            There are no scheduled interviews at this time.
          </p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-[1em]">
          {eventData?.data?.map((interview: any, index: any) => (
            <div
              key={index.toString()}
              onClick={() => openExternalLink(interview.link)}
            >
              <div
                key={index.toString()}
                className="flex justify-between items-center bg-white px-[1em] py-[.8em] rounded-[.25em] border border-main-100"
              >
                <div className="flex mb-2 items-center">
                  <div>
                    <h2 className="text-[1.25em] font-[400] text-main-901 capitalize">
                      {interview.title}
                    </h2>
                    <p className="text-sm font-[300] text-main-900 capitalize mt-[1em]">
                      {interview.description}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-sm text-gray-600">{interview.date_time}</p>
                  <Platformbtn
                    name="Join"
                    type="normal"
                    addOns="!w-fit !h-[2em] mt-[1em]"
                    click={() => openExternalLink(interview?.link)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleInterview;
