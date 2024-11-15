"use client";
import Image from "next/image";
import Logo from "@/public/svgs/auth/vamp-logo.svg";
import TextBox from "@/components/auth/TextBox";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SetNewPasswordSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import CustomInput from "@/components/shared/inputs/CustomInput";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import SubmitButton from "@/components/shared/SubmitButton";


const SetNewPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [ResetPassword, { isLoading }] = useResetPasswordMutation();
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SetNewPasswordSchema>>({
    resolver: zodResolver(SetNewPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

 



  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken)); 
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof SetNewPasswordSchema>) => {
    const data = {
      token: token,
      password: values.password,
      confirm_password: values.confirm_password,
    };

    try {
      const response = await ResetPassword(data).unwrap();
      setReset(true); 
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  if (reset) {
    return (
      <div className="mx-auto flex flex-col py-10 px-6 lg:px-16 w-[600px]">
        <Image
          src={Logo}
          height={1000}
          width={1000}
          alt="logo"
          className="h-10 w-fit"
        />
        <div className="mt-52">
          <TextBox
            title="Password Reset"
            description="Your password has been successfully reset. Click below to login."
            variant="mt-0"
          />
          <Button
            type="submit"
            className="w-full h-[50px] mt-6"
            onClick={() => router.push("/sign-in")}
          >
            Login
          </Button>
          <p
            onClick={() => router.push("/sign-up")}
            className="cursor-pointer mt-2 font-jakarta text-base"
          >
            Don’t have an account? &nbsp;
            <span className="text-main-600 ">Sign up</span>
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
          alt="logo"
          className="h-10 w-fit"
        />
        <div className="mt-32">
          <TextBox
            title="Set New Password"
            description="Set a strong and secure new password for your account."
            variant="mt-0"
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-10"
            >
              <CustomInput
                control={form.control}
                name="password"
                label="Enter Password"
                type={showPasswordTwo ? "text" : "password"}
                placeholder="Enter your password"
                variant="h-[50px]"
                rightIcon={
                  showPasswordTwo ? (
                    <Eye
                      className="cursor-pointer"
                      onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer"
                      onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                    />
                  )
                }
              />
              <CustomInput
                control={form.control}
                name="confirm_password"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
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
              {/* <Button type="submit" className="w-full h-[50px]">
                Submit
              </Button> */}

              <SubmitButton
                isLoading={isLoading}
                className="w-full h-[50px]"
              >
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
  }
};

export default SetNewPassword;
