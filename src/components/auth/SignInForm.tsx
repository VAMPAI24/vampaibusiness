"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Form } from "@/components/ui/form";
import { SignInSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import CustomInput from "../shared/inputs/CustomInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import SubmitButton from "../shared/SubmitButton";
import { redirect } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { isSuccess, isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      work_email: "",
      password: "",
    },
  });


  // useEffect(() => {
  //   if (isSuccess) {
  //     // toast.success("Login Successfully!");
  //     redirect("/dashboard");
  //   }
  // }, [isSuccess]);

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      const response = await login(values).unwrap();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
        <CustomInput
          control={form.control}
          name="work_email"
          label="Email Address"
          placeholder="Enter your company's email"
          variant="h-[50px]"
        />

        <CustomInput
          control={form.control}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          variant="h-[50px]"
          rightIcon={
            showPassword ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeOff
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )
          }
        />

        <p
          onClick={() => router.push("/reset-password")}
          className="cursor-pointer font-jakarta text-sm"
        >
          Forgot password?&nbsp;
          <span className="text-main-600">Reset Password </span>
        </p>
        <SubmitButton
          isLoading={isLoading}
          loadingText="Logging In..."
          className="w-full h-[50px] mt-6"
        >
          Submit
        </SubmitButton>
      </form>
      <p
        onClick={() => router.push("/sign-up")}
        className="text-center cursor-pointer mt-4 font-jakarta text-base"
      >
        Don’t have an account?&nbsp;
        <span className="text-main-600">Sign up</span>
      </p>
    </Form>
  );
};

export default SignInForm;
