"use client"
import React from "react";
import Image from "next/image";
import Logo from "@/public/svgs/auth/vamp-logo.svg";
import TextBox from "@/components/auth/TextBox";
import SubmitButton from "@/components/shared/SubmitButton";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex flex-col py-10 px-6 lg:px-16 w-[600px]">
      <Image
        src={Logo}
        height={1000}
        width={1000}
        alt="patient"
        className="h-10 w-fit"
      />

      <div className="mt-10">
        <TextBox
          title="Password Change"
          description="Your current password has expired, an update is required for you next login"
          variant="mt-0"
        />

        <SubmitButton
          clickFn={() => router.push("/reset-password")}
          className="w-full h-[50px] mt-10"
        >
          Change Password
        </SubmitButton>

        <p className="cursor-pointer mt-4 font-jakarta text-base">
          For assistance, please contact your&nbsp;
          <span className="text-main-600">IT support</span>&nbsp;team
        </p>
      </div>
    </div>
  );
};

export default page;
