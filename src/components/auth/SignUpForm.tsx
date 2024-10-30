"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Form } from "@/components/ui/form";
import { SignUpSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { SignUpFormProps } from "@/types";
import CustomInput from "../shared/inputs/CustomInput";

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      company_name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    console.log(values);
    onSuccess();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
        <CustomInput
          control={form.control}
          name="company_name"
          label="Company's Name"
          placeholder="Enter your company's Name"
          variant="h-[50px]"
          type="text"
        />

        <CustomInput
          control={form.control}
          name="email"
          label="Company's Email Address"
          placeholder="Enter your company's email"
          variant="h-[50px]"
          type="email"
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

        <Button type="submit" className="w-full h-[50px]">
          Submit
        </Button>
      </form>
      <p
        onClick={() => router.push("/sign-in")}
        className="text-center cursor-pointer mt-4 font-jakarta text-base"
      >
        Don’t have an account?&nbsp;<span className="text-main-600">Login</span>
      </p>
    </Form>
  );
};

export default SignUpForm;
