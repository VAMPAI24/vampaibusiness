"use client";

import { useState } from "react";
import { Container, Button } from "@/components/landingpage";
import { accManagerMail, companySize, waitlistData } from "@/constants";
import Image from "next/image";
import InfoCircle from "@/public/svgs/info-circle.svg";
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
import { openMail } from "@/lib/utils";
import { SyncLoader } from "react-spinners";
import CustomModal from "@/components/shared/CustomModal";
import WaitlistAgreement from "@/components/waitlist/WaitlistAgreement";
import WaitlistNavbar from "@/components/waitlist/WaitlistNavbar";
import Accountmanager from "@/public/svgs/account-manager.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";


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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showThirdContent, setShowThirdContent] = useState(false); // New state for third content
  const { handleValue, handleInput } = useForm(initValue);

  const openCloseModalFn = () => setOpen(!open);

  const handleSubmitFn = async (values: {
    company_name: string;
    company_size: string;
    industry: string;
    full_name: string;
    role: string;
    company_email: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://vampaibe.onrender.com/api/v2/employer/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        setSuccess(true);
        const successData = await response.json();
        openNotificationWithIcon({
          title: "Success",
          message: successData.message,
        });
      } else {
        const errorData = await response.json();
        openNotificationWithIconErr({
          title: "Error",
          message:
            errorData.message || "Something went wrong, please try again.",
        });
      }
    } catch (error) {
      openNotificationWithIconErr({
        title: "Error",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const initMail = () => openMail(accManagerMail);

  const handleModalButtonClick = () => {
    setShowThirdContent(true);
    setOpen(false);
  };

  if (success) {
    return (
      <main>
        <WaitlistNavbar />
        {/* <div className="flex flex-col items-center text-center justify-center p-4">
          <Image
            src={waitlistSuccess}
            alt="waitlist"
            width={400}
            height={400}
            className="w-full max-w-[300px] md:max-w-[400px]"
          />
          <div className="mt-10 w-full max-w-[90%] md:max-w-[600px]">
            <h3 className="text-[#2A3147] font-semibold font-rubik text-[20px] md:text-[24px]">
              Congratulations! You&apos;re All Set!
            </h3>
            <p className="font-jakarta text-sm md:text-base font-normal text-[#4D5366] mt-2">
              Welcome to the Vamp AI community. A confirmation email is on its
              way to your inbox. We&apos;re excited to help you build your dream
              team!
            </p>
          </div>
        </div> */}
         <Container>
          <div className="flex flex-col items-center text-center justify-center p-4 mt-16">
            <Image
              src={Accountmanager}
              alt="account-manager"
              width={400}
              height={400}
              className="w-full max-w-[300px] md:max-w-[400px]"
            />
            <div className="mt-10 w-full max-w-[90%] md:max-w-[600px]">
              <h3 className="text-[#2A3147] font-semibold font-rubik text-[20px] md:text-[24px]">
                An Account Manager Has Been Assigned to You
              </h3>
              <p className="font-jakarta text-sm md:text-base font-normal text-[#4D5366] mt-2">
                Meet Temitayo Johnson-Laleye, your dedicated account manager.
                Temitayo is just an email away to make your hiring process
                smooth and efficient.
              </p>
              <p
                onClick={initMail}
                className="mt-4 text-[#2A3147] font-jakarta font-bold text-base"
              >
                Contact Temitayo at:{" "}
                <span className="text-main-600 cursor-pointer">
                  {accManagerMail}
                </span>
              </p>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  if (showThirdContent) {
    return (
      <main>
        <WaitlistNavbar />
        <Container>
          <div className="flex flex-col items-center text-center justify-center p-4 mt-16">
            <Image
              src={Accountmanager}
              alt="account-manager"
              width={400}
              height={400}
              className="w-full max-w-[300px] md:max-w-[400px]"
            />
            <div className="mt-10 w-full max-w-[90%] md:max-w-[600px]">
              <h3 className="text-[#2A3147] font-semibold font-rubik text-[20px] md:text-[24px]">
                An Account Manager Has Been Assigned to You
              </h3>
              <p className="font-jakarta text-sm md:text-base font-normal text-[#4D5366] mt-2">
                Meet Temitayo Johnson-Laleye, your dedicated account manager.
                Temitayo is just an email away to make your hiring process
                smooth and efficient.
              </p>
              <p
                onClick={initMail}
                className="mt-4 text-[#2A3147] font-jakarta font-bold text-base"
              >
                Contact Temitayo at:{" "}
                <span className="text-main-600 cursor-pointer">
                  {accManagerMail}
                </span>
              </p>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="bg-sec-100">
      <WaitlistNavbar />
      <section className="-mt-10 lg:-mt-6">
        <Container>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full hidden md:flex flex-col gap-[4em] col-span-1">
              <h3 className="w-full font-[700] text-[1.5em] md:text-[2em] leading-[1.2em] text-main-900">
                Welcome to Faster and Smarter Hiring
              </h3>

              <div className="w-full flex flex-col gap-[2em]">
                {waitlistData.map((item, id) => (
                  <div key={id.toString()} className="flex flex-col gap-[1em]">
                    <Image src={item.imgURL} alt={item.title} />
                    <div className="mb-4">
                      <h3 className="font-rubik font-semibold text-[20px] md:text-[25px] text-sec-901">
                        {item.title}
                      </h3>
                      <p className="font-jakarta font-normal text-[16px] md:text-[18px] text-sec-901">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full bg-white col-span-1 flex flex-col gap-[2em] p-[1.5em] md:px-[3em] md:py-[2.5em] rounded-[20px] border-[.5px] border-sec-200">
              <Titlesubtitle
                title="Join the Fast Lane to Smarter Hiring"
                tclass="!text-[1.5em]"
                subtitle="Sign up now to secure your spot and unlock early access benefits."
              />

              <Formik
                initialValues={initValue}
                validationSchema={waitlistSchema}
                onSubmit={async (values) => await handleSubmitFn(values)}
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

                        <div className="w-full flex gap-[1em] flex-wrap">
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

                          {errors.company_size && touched.company_size && (
                            <div className="flex items-center gap-[5px] pl-[15px] rounded-b-[5px] w-full">
                              <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="!my-0 text-[1em] text-red-700"
                              />
                              <p className="font-[300] text-[.9em] leading-[1.4em] text-red-900">
                                {errors.company_size}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <Textfield
                        name="industry"
                        label="Industry"
                        placeholder="e.g Technology"
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
                        error={
                          errors.full_name && touched.full_name
                            ? errors.full_name
                            : ""
                        }
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
                          errors.company_email && touched.company_email
                            ? errors.company_email
                            : ""
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
                        error={errors.role && touched.role ? errors.role : ""}
                        onChange={(e) => {
                          handleChange(e);
                          handleInput(e);
                        }}
                      />

                      <div className="w-full flex flex-col gap-[1.5em] mt-[2em]">
                        <Button
                          text={
                            loading ? (
                              <SyncLoader size="0.8rem" color="#ffffff" />
                            ) : (
                              "Sign Up"
                            )
                          }
                          variant="bg-main-600 text-white rounded-full w-full h-[3.5em]"
                          type="submit"
                        />
                        <div
                          onClick={openCloseModalFn}
                          className="w-full flex items-center gap-[1em] bg-main-100 rounded-[1em] p-[1em] cursor-pointer"
                        >
                          <Image src={InfoCircle} alt="info" />
                          <p className="text-[.9em] md:text-[1em] text-main-900 font-[300]">
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

      <CustomModal
        isOpen={open}
        onClose={openCloseModalFn}
        className={"w-[95%] md:max-w-lg"}
      >
        <WaitlistAgreement handleModalButtonClick={handleModalButtonClick} />
      </CustomModal>

{/* 
      <MainModal visible={open} close={openCloseModalFn}>
      <WaitlistAgreement handleModalButtonClick={handleModalButtonClick} />

      </MainModal> */}
    </main>
  );
}
