"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
} from "@/components/ui/form";
import { SignInSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import CustomInput from "../shared/inputs/CustomInput";

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
        <CustomInput
          control={form.control}
          name="email"
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
        


        <p onClick={() => router.push('/reset-password')} className="cursor-pointer font-jakarta text-sm">Forgot password?&nbsp;<span className="text-main-600">Reset Password </span></p>
        <Button type="submit" className="w-full h-[50px]">Submit</Button>
      </form>
        <p onClick={() => router.push('/sign-up')} className="text-center cursor-pointer mt-4 font-jakarta text-base">Don’t have an account?&nbsp;<span className="text-main-600">Sign up</span></p>
    </Form>
  );
};

export default SignInForm;
