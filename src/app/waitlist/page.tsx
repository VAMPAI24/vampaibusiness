"use client";

import { Container, Button } from "@/components/landingpage";
import { accManagerMail, companySize, waitlistData } from "@/constants";
import Image from "next/image";
import InfoCircle from "@/public/svgs/info-circle.svg";
import { Mainmodal } from "@/components/common/modal";
import { Agreement } from "@/components/landingpage/waitlist";
import { useState } from "react";
import { Titlesubtitle } from "@/components/common/titlesub";
import { useForm } from "@/lib/hooks";
import { Formik } from "formik";
import Textfield from "@/components/common/inputs/textfield";
import { waitlistSchema } from "@/lib/schemas";
import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from "@/lib/notifs";
import RadioField from "@/components/common/inputs/radioField";
import { LogoNavbar } from "@/components/landingpage/sections/Navbar";
import { openMail } from "@/lib/utils";

const initValue = {
  company_name: "",
  company_size: "",
  industry: "",
  full_name: "",
  role: "",
  company_email: "",
};

export default function Page() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data, handleValue, handleInput } = useForm(initValue);

  const openCloseModalFn = () => setOpen(!open);

  const handleSubmitFn = async (values: { company_name: string; company_size: string; industry: string; full_name: string; role: string; company_email: string; }) => {
    try {
      const response = await fetch("https://vampaibe.onrender.com/api/v2/employer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values) 
      });

      if (response.ok) {
        setSuccess(true);
        openNotificationWithIcon({
          title: "Success",
          message: "You have been successfully added to the waitlist.",
        });
      } else {
        const errorData = await response.json();
        openNotificationWithIconErr({
          title: "Error",
          message: errorData.message || "Something went wrong, please try again.",
        });
      }
    } catch (error) {
      console.log(error);
      openNotificationWithIconErr({
        title: "Network Error",
        message: "Unable to connect, please check your network and try again.",
      });
    }
  };

  // Initiates mail
  const initMail = () => openMail(accManagerMail);

  if (success) {
    return (
      <main className="bg-sec-100 min-h-screen max-h-screen overflow-hidden">
        <LogoNavbar />
        <section className="h-screen flex items-center justify-center">
          <Container variant="flex">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full md:w-[50%] 2xl:w-[30em] text-center flex flex-col gap-[1em] items-center mx-auto">
                <h1 className="font-rubik font-bold text-[2em] text-sec-900 leading-[1em]">
                  An Account Manager Has Been Assigned to You
                </h1>
                <p className="font-jakarta text-sec-901 text-base">
                  Meet Temitayo Johnson-Laleye, your dedicated account manager.
                  Temitayo is just an email away to make your hiring process
                  smooth and efficient.
                </p>
              </div>

              <p
                onClick={initMail}
                className="text-[1em] inline text-center mt-[2em] italic text-main-800 cursor-pointer"
              >
                <strong className="text-main-901 !no-underline">
                  {" "}
                  Contact Temitayo at:{" "}
                </strong>{" "}
                <strong className="underline font-[300] ">
                  {" "}
                  temitayo@usevamp.ai{" "}
                </strong>
              </p>
            </div>
          </Container>
        </section>
      </main>
    );
  } else {
    return (
      <main className="bg-sec-100 ">
        <LogoNavbar />
        <Mainmodal visible={open} close={openCloseModalFn}>
          <Agreement />
        </Mainmodal>
        <section className="min-h-screen pt-[3em]">
          <Container>
            <div className="w-full grid md:grid-cols-2">
              <div className="w-full hidden xl:flex flex-col gap-[6em] col-span-1">
                <div className="w-full flex flex-col gap-[4em]">
                  <h3 className="w-[60%] font-[700] text-[2em] leading-[1em] text-main-900">
                    Welcome to Faster and Smarter Hiring
                  </h3>

                  <div className="w-[70%] flex flex-col gap-[3em]">
                    {waitlistData.map((item, id) => (
                      <div key={id.toString()} className="flex flex-col gap-[1em] ">
                        <Image src={item.imgURL} alt={item.title} />
                        <div className=" mb-4">
                          <h3 className="font-rubik font-semibold text-[25px] text-sec-901">
                            {item.title}
                          </h3>
                          <p className="font-jakarta font-normal txt-[18px]  text-sec-901">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full bg-white col-span-1 flex flex-col gap-[3em] px-[3em] py-[2.5em] rounded-[20px] border-[.5px] border-sec-200 ">
                <Titlesubtitle
                  title="Join the Fast Lane to Smarter Hiring"
                  tclass="!text-[1.5em]"
                  subtitle="Sign up now to secure your spot and unlock early access benefits."
                />

                <Formik
                  initialValues={initValue}
                  validationSchema={waitlistSchema}
                  onSubmit={async (values) => {
                    console.log(values);  
                    await handleSubmitFn(values); 
                  }}
                >
                  {(formik) => {
                    const {
                      errors,
                      touched,
                      values,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                    } = formik;
                    return (
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-[1em]"
                      >
                        <Textfield
                          name="company_name"
                          label="Company name"
                          placeholder="e.g Google"
                          value={values.company_name}
                          error={
                            errors.company_name && touched.company_name
                              ? errors.company_name
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e);
                            handleInput(e);
                          }}
                        />

                        <div className="w-full flex flex-col gap-[.5em]">
                          <p className="my-0 font-jakarta-sans font-[300] text-[.75em] text-main-900 capitalize">
                            Company Size
                          </p>
                          <div className="w-full flex gap-[1em]">
                            {companySize.map((item, id) => (
                              <RadioField
                                key={id.toString()}
                                label={item}
                                value={values.company_size === item}
                                onSelect={() => {
                                  setFieldValue("company_size", item);
                                  handleValue("company_size", item);
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <Textfield
                          name="industry"
                          label="Industry"
                          placeholder="e.g Education"
                          value={values.industry}
                          error={
                            errors.industry && touched.industry
                              ? errors.industry
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e);
                            handleInput(e);
                          }}
                        />

                        <Textfield
                          name="full_name"
                          label="Full Name"
                          placeholder="John Doe"
                          value={values.full_name}
                          error={errors.full_name && touched.full_name ? errors.full_name : ""}
                          onChange={(e) => {
                            handleChange(e);
                            handleInput(e);
                          }}
                        />
                        <Textfield
                          name="company_email"
                          label="Email Address"
                          placeholder="johndoe@gmail.com"
                          value={values.company_email}
                          error={
                            errors.company_email && touched.company_email ? errors.company_email : ""
                          }
                          onChange={(e) => {
                            handleChange(e);
                            handleInput(e);
                          }}
                        />

                        <Textfield
                          name="role"
                          label="Position in Company"
                          placeholder="e.g HR Manager"
                          value={values.role}
                          error={
                            errors.role && touched.role
                              ? errors.role
                              : ""
                          }
                          onChange={(e) => {
                            handleChange(e);
                            handleInput(e);
                          }}
                        />
                        
                        <div className="w-full flex flex-col gap-[1.5em] mt-[2em] ">
                          <Button
                            text="Join the waitlist"
                            variant="bg-main-600 text-white rounded-full w-full h-[4em]"
                            type="submit" // Ensure the button is a submit button
                          />
                          <div
                            onClick={openCloseModalFn}
                            className="w-full flex items-center gap-[1em] bg-main-100 rounded-[1em] p-[1em] cursor-pointer"
                          >
                            <Image src={InfoCircle} alt="info" />
                            <p className="text-[1em] text-main-900 font-[300]">
                              By clicking continue, you agree to our{" "}
                              <strong className="font-[300] text-main-800">
                                Agreement of Payments
                              </strong>
                            </p>
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  }
}
