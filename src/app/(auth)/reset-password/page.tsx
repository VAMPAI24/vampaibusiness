"use client";
import Image from "next/image";
import Logo from "@/public/svgs/auth/vamp-logo.svg";
import TextBox from "@/components/auth/TextBox";
import React, { useState } from "react";
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
  const [checkMail] = useState<boolean>(false);
  const [sendResetPasswordLink, { isLoading }] = useSendResetPasswordLinkMutation();
  // const [isResending, setIsResending] = useState<boolean>(false); 

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      work_email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    try {
      await sendResetPasswordLink(values).unwrap();
      // setCheckMail(true);
    } catch (error) {
      console.log(error);
    }
  };

  // const openMailClient = (email: string) => {
  //   // If your work email uses Google Workspace
  //   const googleWorkspaceDomains = ["yourcompany.com", "anothercompany.com"]; // Add domains for Google Workspace
    
  //   // If your work email uses Microsoft 365
  //   const outlookDomains = ["yourcompanyoutlook.com", "anotheroutlookcompany.com"]; // Add domains for Microsoft 365
  
  //   // Extract domain from email
  //   const emailDomain = email.split("@")[1];
  
  //   if (googleWorkspaceDomains.includes(emailDomain)) {
  //     // Open Google Workspace (Gmail) inbox
  //     window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  //   } else if (outlookDomains.includes(emailDomain)) {
  //     // Open Microsoft 365 (Outlook) inbox
  //     window.open("https://outlook.office.com/mail/inbox", "_blank");
  //   } else {
  //     // Fallback: open default mail client
  //     window.open(`mailto:${email}`, "_blank");
  //   }
  // };

  // const handleResendEmail = async () => {
  //   setIsResending(true);
  //   try {
  //     const email = form.getValues("work_email"); // Get email from the form
  //     await sendResetPasswordLink({ work_email: email }).unwrap();
  //     ToastNotification({
  //       title: "Success",
  //       description: "A new reset link has been sent to your email.",
  //       type: "success",
  //     });
    
  //   } catch (error) {
  //     console.log(error);
  //     ToastNotification({
  //       title: "Error" ,
  //       description: "Failed to resend the email. Please try again.",
  //       type: "error",
  //     });
  
  //   } finally {
  //     setIsResending(false);
  //   }
  // };

  if (checkMail) {
    // return (
    //   <div className="mx-auto flex flex-col py-10 px-6 lg:px-16 w-[600px]">
    //     <Image
    //       src={Logo}
    //       height={1000}
    //       width={1000}
    //       alt="patient"
    //       className="h-10 w-fit"
    //     />

    //     <div className="mt-48">
    //       <TextBox
    //         title="Check your Mail"
    //         description="A password reset link has been sent to your mail"
    //         variant="mt-0"
    //       />

    //       <Button
    //         type="button"
    //         onClick={() => openMailClient("your-email@yourcompany.com")}
    //         className="w-full h-[50px] mt-6"
    //       >
    //         Open Mail
    //       </Button>

    //       <p
    //         onClick={handleResendEmail}
    //         className="cursor-pointer mt-2 font-jakarta text-base"
    //       >
    //         Didn’t get a mail?&nbsp;
    //         <span className="text-main-600">
    //           {isResending ? "Resending..." : "Click to resend"}
    //         </span>
    //       </p>
    //     </div>
    //   </div>
    // );
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

export default ResetPassword;

