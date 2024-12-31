/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Button from "../landingpage/button";
import Jobbox from "./Jobbox";
import OverviewCard from "./OverviewCard";
import {
  CalendarPlus,
  StickyNote,

  CirclePlus,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  useGetActiveJobsQuery,
  useGetDraftJobsQuery,
} from "@/redux/features/job-posting/jobpostingApi";
import Colum from "@/public/svgs/Jobs/column.svg";
import PicsCollection from "@/public/svgs/Jobs/pics-collection.svg";
import { JobOverviewProps } from "@/types";
import { recipes } from "@/constants";
import OverviewSkelton from "../common/skeltons/OverviewSkelton";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const JobOverview = ({ setCurrentView }: JobOverviewProps) => {
  const [tabToFetch, setTabToFetch] = useState("active")
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);


// Active JoB
const { data: activeJobs, isLoading: activeJobsLoader, refetch: activeRefetch } =
  useGetActiveJobsQuery(token, {skip: tabToFetch !== "active"}); 

// Draft Jobs
const { data: draftJobs, isLoading: draftJobsLoader, refetch: draftRefectch } =
  useGetDraftJobsQuery(token, { skip: tabToFetch !== "Drafts" }); 

const handleNavigation = (id: string) => {
  router.push(`/job-posting/${id}`);
};

useEffect(() => {
  activeRefetch();
  if (tabToFetch === "Drafts" && draftRefectch) {
    draftRefectch();
  }
  const storedToken = Cookies.get("token");
  if (storedToken) {
    setToken(storedToken);
  }
}, [activeRefetch, tabToFetch, draftRefectch]);

  

  return (
    <div className="">
      <Jobbox title="Overview" variant="mb-4 text-[20px]" />
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <OverviewCard
          title="Active Job Posts"
          count={activeJobs?.data?.count}
          icon={<CalendarPlus className="text-main-901" size={20} />}
        />
        {/* <OverviewCard
          title="Inactive Job Posts"
          count={3}
          icon={<CalendarMinus className="text-main-901" size={20} />}
        /> */}
        <OverviewCard
          title="Jobs in Draft"
          count={draftJobs?.data?.count}
          icon={<StickyNote className="text-main-901" size={20} />}
        />
        {/* <OverviewCard
          title="Total Applicants"
          count={100}
          icon={<NotebookPen className="text-main-901" size={20} />}
        /> */}
      </div>

      <div className="flex flex-row justify-between items-center gap-4 md:gap-0 mt-10">
        <Jobbox
          title="My Job Posts"
          titleVariant="text-[15px] lg:text-[22px]"
        />
        <Button
          text="Create a Job Post"
          variant="bg-main-600 text-white rounded-full w-[200px] flex justify-center items-center gap-1"
          imgIcon={
            <CirclePlus
              color="#0061F9"
              size={20}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
              }}
            />
          }
          clickFn={() => setCurrentView("createJob")}
        />
      </div>

      <Tabs defaultValue="active" className="w-full mt-10">
        <TabsList className="relative">
          <TabsTrigger
            value="active"
            className="rounded relative pb-3 transition-colors after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-[#F9FAFB] data-[state=active]:after:bg-blue-500"
            onClick={() => setTabToFetch("active")}
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="inactive"
            className="relative pb-3 rounded transition-colors after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-[#F9FAFB] data-[state=active]:after:bg-blue-500 hidden"
          >
            Inactive
          </TabsTrigger>
          <TabsTrigger
            value="Drafts"
            className="relative pb-3 rounded transition-colors after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:bg-transparent data-[state=active]:bg-[#F9FAFB] data-[state=active]:after:bg-blue-500"
            onClick={() => setTabToFetch("Drafts")}
          >
            Drafts
          </TabsTrigger>
        </TabsList>
        <hr className="" />
        <TabsContent value="active">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center lg:gap-6 mt-10">
            {activeJobsLoader ? (
              Array.from({ length: 3 }).map((_, id) => (
                <div
                  key={id.toString()}
                  className="w-[300px] h-full opacity-[.5]"
                >
                  <OverviewSkelton />
                </div>
              ))
            ) : activeJobs?.data?.jobs?.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No active jobs available.
              </div>
            ) : (
              activeJobs?.data?.jobs.map((recipe: any) => (
                <Card
                  key={recipe.id}
                  className="flex flex-col justify-between px-2 py-2 w-[300px] h-[200px] cursor-pointer"
                  onClick={() => handleNavigation(recipe.id)}
                >
                  <CardHeader className="flex flex-row gap-10 justify-between items-start">
                    <Badge className="px-2 rounded-lg">Active</Badge>
                    {/* column */}
                    {/* <Image src={Colum} alt="card-img" /> */}
                  </CardHeader>
                  <CardContent>
                    <h2 className="mb-2 text-main-901 font-rubik text-base capitalize">
                      {recipe.job_title}
                    </h2>
                    <div className="text-main-901 font-jakarta text-xs">
                      {Array.isArray(recipe?.job_specifications) &&
                        recipe?.job_specifications.map((desc: any) => (
                          <p
                            key={desc.jobDescription}
                            className="text-main-901 font-jakarta text-xs break-words"
                          >
                            {desc.jobDescription?.substring(0, 150)}
                            {desc.jobDescription?.length > 150 ? "..." : ""}
                          </p>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-10 justify-between">
                    <div className="flex gap-10 flex-row">
                      <p className="text-sm text-gray-500">
                        Edited:{" "}
                        <span className="text-xs">
                          {new Date(recipe.updated_at).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                    {/* <Image src={PicsCollection} alt="card-img" /> */}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="inactive">
          {/* Inactive Jobs */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center lg:gap-6 mt-10">
            {recipes.map((recipe: any) => (
              <Card
                key={recipe.id}
                className="flex flex-col justify-between px-2 py-2 w-[300px]"
              >
                <CardHeader className="flex flex-row gap-10 justify-between items-start">
                  <Badge className="px-2 rounded-lg bg-[#4D5366]">
                    Inactive
                  </Badge>
                  <Image src={Colum} alt="card-img" />
                </CardHeader>
                <CardContent>
                  <h2 className="mb-2 text-main-901 font-rubik text-base">
                    {recipe.title}
                  </h2>
                  <p className="text-main-901 font-jakarta text-xs">
                    {recipe.description}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-10 justify-between">
                  <div className="flex gap-10 flex-row">
                    <p className="text-sm text-gray-500">
                      Edited: <span className="text-xs">30 October 2024</span>
                    </p>
                  </div>
                  <Image src={PicsCollection} alt="card-img" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Drafts">
          {/* Drafts */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center lg:gap-6 mt-10">
            {draftJobsLoader ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <div key={index} className="w-[300px] h-full">
                  <OverviewSkelton />
                </div>
              ))
            ) : draftJobs?.data?.jobs?.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No draft jobs available.
              </div>
            ) : (
              draftJobs?.data?.jobs.map((recipe: any) => (
                <Card
                  key={recipe.id}
                  className="flex flex-col justify-between px-2 py-2 w-[300px] h-[200px] cursor-pointer"
                  // onClick={() => handleNavigation(recipe.id)}
                >
                  <CardHeader className="flex flex-row gap-10 justify-between items-start">
                    <Badge className="px-2 rounded-lg bg-[#E99F0B]">
                      Draft
                    </Badge>
                    {/* colum */}
                    {/* <Image src={Colum} alt="card-img" /> */}
                  </CardHeader>
                  <CardContent>
                    <h2 className="mb-2 text-main-901 font-rubik text-base capitalize">
                      {recipe.job_title}
                    </h2>
                    <div className="text-main-901 font-jakarta text-xs">
                      {Array.isArray(recipe?.job_specifications) &&
                        recipe?.job_specifications.map((desc: any) => (
                          <p
                            key={desc.jobDescription}
                            className="text-main-901 font-jakarta text-xs break-words"
                          >
                            {desc.jobDescription.slice(0, 150)}
                          </p>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-10 justify-between">
                    <div className="flex gap-10 flex-row">
                      <p className="text-sm text-gray-500">
                        Edited:{" "}
                        <span className="text-xs">
                          {new Date(recipe.updated_at).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                    {/* <Image src={PicsCollection} alt="card-img" /> */}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobOverview;
