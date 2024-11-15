"use client";
import { useState } from "react";
import StepIndicator from "@/components/common/stepindicator";
import TextBox from "@/components/auth/TextBox";
import SignUpForm from "@/components/auth/SignUpForm";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import SubmitButton from "@/components/shared/SubmitButton";
import { useEmailVerificationMutation } from "@/redux/features/auth/authApi";

const SignUp = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [otp, setOtp] = useState("");

  const steps = ["Create Account", "Verify Account"];
  const nextStep = () => {
    setActive((prevActive) => Math.min(prevActive + 1, steps.length - 1));
  };

  const { userSignUpInfo } = useSelector((state: RootState) => state.auth);

  const data = {
    otp: otp,
    work_email: userSignUpInfo?.work_email,
  };

  const [emailVerification, { isLoading }] = useEmailVerificationMutation();

  const onSubmit = async (values: {
    otp: string;
    work_email: string | undefined;
  }) => {
    try {
      const response = await emailVerification(values).unwrap();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const RenderSteps = () => {
    const router = useRouter();

    switch (active) {
      case 0:
        return (
          <div className="py-10">
            <TextBox
              title="Create an Account"
              description="Create an account to unlock the power of AI in finding top talent and transforming your hiring process."
              variant="mt-0 text-center justify-center items-center"
            />
            <SignUpForm onSuccess={nextStep} />
          </div>
        );

      case 1:
        return (
          <div className="py-36">
            <TextBox
              title="Verify Account"
              description="Enter the OTP sent to your email address to verify your account"
              variant="mt-0 text-center justify-center items-center"
            />

            <div className="mt-6">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="shad-otp">
                  <InputOTPSlot className="shad-otp-slot" index={0} />
                  <InputOTPSlot className="shad-otp-slot" index={1} />
                  <InputOTPSlot className="shad-otp-slot" index={2} />
                  <InputOTPSlot className="shad-otp-slot" index={3} />
                </InputOTPGroup>
              </InputOTP>

              {/* {error && (
                <p className="shad-error text-14-regular mt-4 flex justify-center">
                  {error}
                </p>
              )} */}

              <SubmitButton
                clickFn={() => onSubmit(data)}
                isLoading={isLoading}
                loadingText="Verifying OTP..."
                className="w-full h-[50px] mt-6"
              >
                Submit
              </SubmitButton>

              <p
                onClick={() => router.push("/sign-in")}
                className="text-center cursor-pointer mt-4 font-jakarta text-base"
              >
                Do have an account?&nbsp;
                <span className="text-main-600">Login</span>
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="mx-auto container flex flex-col py-16 px-6 lg:px-16 w-[600px]">
      <StepIndicator steps={steps} active={active} />
      {RenderSteps()}
    </section>
  );
};

export default SignUp;
