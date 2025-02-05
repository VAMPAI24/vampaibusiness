"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ArrowDown from "@/public/svgs/dashboard/arrow-down.svg";
import Image from "next/image";
import { useGetSingleEmployerQuery } from "@/redux/features/auth/authApi";
import Cookies from "js-cookie";

const NavProfile = () => {
  const [token, setToken] = useState<string | null>(null);
  const { data: userData, refetch } = useGetSingleEmployerQuery(token);

  useEffect(() => {
    refetch();
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [refetch]);

  return (
    <div className="flex items-center justify-center gap-2">
      {userData?.data?.company_logo ? (
        <div className="w-[2.5em] h-[3.5em] overflow-hidden rounded-full flex justify-center items-center">
        <Image
          src={userData?.data?.company_logo}
          alt="profile"
          className="object-cover w-full"
          width={50}
          height={50}
        />
      </div>
      ) : (
        <Avatar>
          <AvatarFallback>
            {userData?.data?.first_name?.[0] && userData?.data?.last_name?.[0]
              ? `${userData.data.first_name[0]}${userData.data.last_name[0]}`.toUpperCase()
              : "NA"}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="hidden md:block">
        <div className="flex gap-1">
          <p className="text-main-902 font-semibold font-jakarta text-m§d">
            {userData?.data?.first_name}
          </p>
          <p className="text-main-902 font-semibold font-jakarta text-md">
            {userData?.data?.last_name}
          </p>
        </div>
        <p className="text-main-900 font-jakarta font-semibold text-xs">
          {userData?.data?.work_email}
        </p>
      </div>

      <div>
        <Image src={ArrowDown} alt="arrow-down" width={20} height={20} />
      </div>
    </div>
  );
};

export default NavProfile;
