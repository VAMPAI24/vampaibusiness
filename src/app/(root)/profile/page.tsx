/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { ProfileBox } from "@/components/dashboard";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { ProfileSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { Industries, numberOfEmployees } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import {
  useGetSingleEmployerQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { fetchAllCountries } from "@/lib/utils";

const Profile = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const { data: userInfo, refetch } = useGetSingleEmployerQuery(token);
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      position_in_company: "",
      work_email: "",
      phone_Number: "",
      country: "",
      company_name: "",
      company_website: "",
      no_employees: "",
      industry: "",
      company_bio: "",
      file: null,
    },
  });

  const { setValue, control } = form;

  useEffect(() => {
    if (userInfo) {
      setValue("first_name", userInfo?.data?.first_name || "");
      setValue("last_name", userInfo?.data?.last_name || "");
      setValue(
        "position_in_company",
        userInfo?.data?.Position_in_company || ""
      );
      setValue("work_email", userInfo?.data?.work_email || "");
      setValue("phone_Number", userInfo?.data?.phone_Number || "");
      setValue("country", userInfo?.data?.country || "");
      setValue("company_name", userInfo?.data?.company_name || "");
      setValue("company_website", userInfo?.data?.company_website || "");
      setValue("no_employees", userInfo?.data?.No_Employees || "");
      setValue("industry", userInfo?.data?.industry || "");
      setValue("company_bio", userInfo?.data?.company_bio || "");
      if (userInfo?.data?.company_logo) {
        setImage(userInfo.data.company_logo);
      }
    }
  }, [userInfo, setValue]);

  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    try {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("position_in_company", values.position_in_company);
      formData.append("work_email", values.work_email);
      formData.append("phone_number", values.phone_Number);
      formData.append("country", values.country);
      formData.append("company_name", values.company_name);
      formData.append("company_website", values.company_website);
      formData.append("no_employees", values.no_employees || "");
      formData.append("industry", values.industry);
      formData.append("company_bio", values.company_bio);
      if (imageFile) {
        formData.append("file", imageFile);
      }

      await updateProfile(formData).unwrap();
      await refetch();
      setTimeout(() => {
        router.push("/dashboard");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="hide-scrollbar">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-md p-4 flex items-center justify-between w-full">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={handleClick}
            >
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <div className="h-14 w-14 bg-blue-50 flex items-center justify-center rounded-md overflow-hidden">
                {image ? (
                  // <Image
                  //   src={image}
                  //   alt="Uploaded Logo"
                  //   width={50}
                  //   height={50}
                  //   className="h-full w-full object-cover"
                  // />

                  <div className="w-[3.5em] h-[3.5em] overflow-hidden rounded-full flex justify-center items-center">
                    <Image
                      src={image}
                      alt="profile"
                      className="object-cover w-full"
                      width={50}
                      height={50}
                    />
                  </div>
                ) : (
                  <span className="text-lg font-semibold text-blue-800">V</span>
                )}
              </div>
              <div>
                <h1 className="text-[#001633] font-rubik text-lg font-medium">
                  Company&apos;s Logo
                </h1>
                <p className=" text-main-901 text-[14px] font-jakarta'">
                  Upload your company logo to help build brand recognition
                </p>
              </div>
            </div>
            <a
              href="#"
              onClick={handleClick}
              className="text-sm text-blue-500 font-medium hover:underline cursor-pointer"
            >
              Edit
            </a>
          </div>

          <div className="bg-white px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6 lg:gap-10">
            <ProfileBox
              title="Personal Information"
              description="Provide your basic details to help us personalize your experience"
            />
            <div className="relative">
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row xl:flex-row w-full lg:w-[550px] mb-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="first_name"
                  label="First Name"
                  placeholder="Enter your First Name"
                  variant="h-[40px] w-full"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter your Last Name"
                  variant="h-[40px] w-full"
                />
              </div>
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row xl:flex-row mb-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="position_in_company"
                  label="Position in Company"
                  placeholder="Enter Position in Company"
                  variant="h-[40px] w-full"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="work_email"
                  label="Work Email Address"
                  placeholder="Enter your work email address"
                  variant="h-[40px] w-full"
                  disabled={true}
                />
              </div>
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone_Number"
                label="Phone Number"
                placeholder="e.g., 0901 234 5678"
                variant="h-[40px] w-full"
              />
            </div>
          </div>

          <div className="bg-white px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6 lg:gap-10">
            <ProfileBox
              title="Company's Information"
              description="Enter key company details to build your professional profile"
            />
            <div className="relative">
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row lg:w-[550px] mb-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="company_name"
                  label="Company's Name"
                  placeholder="Enter your Company's Name"
                  variant="h-[40px] w-full"
                  disabled={true}
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="company_website"
                  label="Company's Website"
                  placeholder="Enter your Company's Website"
                  variant="h-[40px] w-full"
                />
              </div>
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row mb-4">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={control}
                  name="no_employees"
                  label="Number of Employees"
                  placeholder="Enter the Number of Employees"
                  variant="h-[40px] w-full"
                  defaultValue={userInfo?.data?.no_employees || ""}
                >
                  {numberOfEmployees.map((employ, index) => (
                    <SelectItem key={`${employ}-${index}`} value={employ}>
                      {employ}
                    </SelectItem>
                  ))}
                </CustomFormField>

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={control}
                  name="industry"
                  label="Industry"
                  placeholder="Enter your industry"
                  variant="h-[40px] w-full"
                  defaultValue={userInfo?.data?.industry || ""}
                >
                  {Industries.map((industry, index) => (
                    <SelectItem key={industry + index} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row lg:w-[550px] mb-4">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={control}
                  name="country"
                  label="Country"
                  placeholder="Enter Country"
                  variant="h-[40px] w-full"
                  defaultValue={userInfo?.data?.country || ""}
                >
                  {(fetchAllCountries() ?? []).map((country:any, index:any) => (
                    <SelectItem
                      key={country.value + index}
                      value={country.value}
                    >
                      {country.label}
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="company_bio"
                label="Company's Bio"
                placeholder="Enter your company  Bio"
                variant="h-20 w-full"
              />
            </div>
          </div>

          <div className="bg-white px-4 sm:px-6 lg:px-8 py-6 flex justify-end items-center">
            <SubmitButton
              className="w-full sm:w-[150px] h-11"
              isLoading={isUpdatingProfile}
            >
              Update Profile
            </SubmitButton>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Profile;