"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ArrowDown from "@/public/svgs/dashboard/arrow-down.svg";
import Image from "next/image";
import { useGetSingleEmployerQuery } from "@/redux/features/auth/authApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { setUser } from "@/redux/features/auth/authSlice";

const NavProfile = () => {
  // const [token, setToken] = useState<string | null>(null);
  // const { data: userData, refetch } = useGetSingleEmployerQuery(token);

  // useEffect(() => {
  //   refetch();
  //   const storedToken = Cookies.get("token");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, [refetch]);


  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);
  const userData = useSelector((state: RootState) => state.auth.user); 
  
  console.log("userData", userData);

  const { data, refetch } = useGetSingleEmployerQuery(token, {
    skip: !token, 
  });

  
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
    // refetch();
  }, [refetch]);

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data)); // Store user data in Redux
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (token) {
      refetch(); // Refetch when token changes
    }
  }, [token, refetch]);

  return (
    <div className="flex items-center justify-center gap-2">
      {userData?.company_logo ? (
        <div className="w-[2.5em] h-[3.5em] overflow-hidden rounded-full flex justify-center items-center">
        <Image
          src={userData?.company_logo}
          alt="profile"
          className="object-cover w-full"
          width={50}
          height={50}
        />
      </div>
      ) : (
        <Avatar>
          <AvatarFallback>
            {userData?.first_name?.[0] && userData?.last_name?.[0]
              ? `${userData?.irst_name[0]}${userData?.last_name[0]}`.toUpperCase()
              : "NA"}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="hidden md:block">
        <div className="flex gap-1">
          <p className="text-main-902 font-semibold font-jakarta text-m§d">
            {userData?.first_name}
          </p>
          <p className="text-main-902 font-semibold font-jakarta text-md">
            {userData?.last_name}
          </p>
        </div>
        <p className="text-main-900 font-jakarta font-semibold text-xs">
          {userData?.work_email}
        </p>
      </div>

      <div>
        <Image src={ArrowDown} alt="arrow-down" width={20} height={20} />
      </div>
    </div>
  );
};

export default NavProfile;
