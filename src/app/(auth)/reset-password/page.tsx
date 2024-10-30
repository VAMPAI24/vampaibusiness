"use client";
import Image from "next/image";
import Logo from "@/public/svgs/auth/vamp-logo.svg";
import TextBox from "@/components/auth/TextBox";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ResetPasswordSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/shared/inputs/CustomInput";

const ResetPassword = () => {
  const router = useRouter();
  const [checkMail ] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    console.log(values);
  }

  if (checkMail) {
    return (
      <div className="mx-auto flex flex-col py-10 px-6 lg:px-16 w-[600px]">
        <Image
          src={Logo}
          height={1000}
          width={1000}
          alt="patient"
          className="h-10 w-fit"
        />

        <div className="mt-48">
          <TextBox
            title="Check your Mail"
            description="A password reset link as been sent to your mail"
            variant="mt-0"
          />

          <Button type="submit" className="w-full h-[50px] mt-6">
            Open Mail
          </Button>

          <p
            onClick={() => {}}
            className="cursor-pointer mt-2 font-jakarta text-base"
          >
            Didn’t get a mail ?&nbsp;
            <span className="text-main-600">Click to resend</span>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto flex flex-col py-10 px-6 lg:px-16 w-[600px]">
        <Image
          src={Logo}
          height={1000}
          width={1000}
          alt="patient"
          className="h-10 w-fit"
        />

        <div className="mt-40">
          <TextBox
            title="Request New Password"
            description="Enter the email linked to your account to reset your password."
            variant="mt-0"
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-10"
            >
              <CustomInput
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                variant="h-[50px]"
              />

              <Button type="submit" className="w-full h-[50px]">
                Submit
              </Button>
            </form>
            <p
              onClick={() => router.push("/sign-in")}
              className="cursor-pointer mt-4 font-jakarta text-base"
            >
              Already have an account ?&nbsp;
              <span className="text-main-600">Login</span>
            </p>
          </Form>
        </div>
      </div>
    );
  }
};

export default ResetPassword;
