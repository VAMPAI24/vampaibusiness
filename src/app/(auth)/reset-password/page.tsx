"use client";
import Image from "next/image";
import Logo from "@/public/svgs/auth/vamp-logo.svg";
import TextBox from "@/components/auth/TextBox";
import React  from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ResetPasswordSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/shared/inputs/CustomInput";
import { useSendResetPasswordLinkMutation } from "@/redux/features/auth/authApi";
import SubmitButton from "@/components/shared/SubmitButton";

const ResetPassword = () => {
  const router = useRouter();
  const [sendResetPasswordLink, { isLoading }] =
    useSendResetPasswordLinkMutation();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      work_email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    try {
      await sendResetPasswordLink(values).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex flex-col py-10 px-6 lg:px-16 w-[600px]">
      <Image
        src={Logo}
        height={1000}
        width={1000}
        alt="patient"
        className="h-10 w-fit"
      />

      <div className="mt-32">
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
              name="work_email"
              label="Work Email Address"
              placeholder="Enter your work email"
              variant="h-[50px]"
            />

            <SubmitButton isLoading={isLoading} className="w-full h-[50px]">
              Submit
            </SubmitButton>
          </form>
          <p
            onClick={() => router.push("/sign-in")}
            className="cursor-pointer mt-4 font-jakarta text-base"
          >
            Already have an account?&nbsp;
            <span className="text-main-600">Login</span>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
