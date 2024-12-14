/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "next/link";
import React from "react";
import { useGetAllEventQuery } from "@/redux/features/job-posting/jobpostingApi";

const ScheduleInterview = () => {
  // Fetch Event Data
  const {
    data: eventData,
  } = useGetAllEventQuery({ max_result: 20 });
  
  return (
    <div>
      <div>
        {eventData?.data?.map((interview: any, index: any) => (
          <Link key={index.toString()} href={interview.link}>
            <div
              key={index.toString()}
              className="flex  justify-between items-center bg-white p-4 rounded shadow border border-gray-200"
            >
              <div className="flex mb-2 items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {interview.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {interview.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{interview.date_time}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ScheduleInterview;
