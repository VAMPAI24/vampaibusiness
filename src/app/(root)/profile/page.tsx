"use client";
import React, { useState } from "react";
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
import { Countries, Industries } from "@/constants";
import { SelectItem } from "@/components/ui/select";

const Profile = () => {
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      position: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      companyWebsite: "",
      numberOfEmployees: "",
      industry: "",
      country: "",
      companyAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof ProfileSchema>) {
    console.log(values);
  }
  
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="hide-scrollbar">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white px-4 sm:px-6 lg:px-8 py-6  flex flex-col lg:flex-row gap-6 lg:gap-10">
            <ProfileBox
              title="Personal Information"
              description="Provide your basic details to help us personalize your experience"
            />
            <div>
              {/* Form Fields for Personal Information */}
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row xl:flex-row w-full lg:w-[550px] mb-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your First Name"
                  variant="h-[40px] w-full"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your Last Name"
                  variant="h-[40px] w-full"
                />
              </div>

              {/* Additional Fields for Personal Information */}
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row xl:flex-row mb-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="position"
                  label="Position in Company"
                  placeholder="Enter Position in Company"
                  variant="h-[40px] w-full"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Work Email Address"
                  placeholder="Enter your work email address"
                  variant="h-[40px] w-full"
                />
              </div>

              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phoneNumber"
                label="Phone Number"
                placeholder="e.g., 0901 234 5678"
                variant="h-[40px] w-full"
              />
            </div>
          </div>

          {/* Company Information Section */}
          <div className="bg-white px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6 lg:gap-10">
            <ProfileBox
              title="Company’s Information"
              description="Enter key company details to build your professional profile"
            />
            <div>
              {/* Company Name and Website Fields */}
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row lg:w-[550px] mb-4">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="country"
                  label="Country"
                  placeholder="Enter Country"
                  variant="h-[40px] w-full"
                >
                  {Countries.map((country, index) => (
                    <SelectItem key={country + index} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row lg:w-[550px] mb-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="companyName"
                  label="Company’s Name"
                  placeholder="Enter your Company’s Name"
                  variant="h-[40px] w-full"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="companyWebsite"
                  label="Company’s Website"
                  placeholder="Enter your Company’s Website"
                  variant="h-[40px] w-full"
                />
              </div>

              {/* Industry and Country Selection Fields */}
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row mb-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="numberOfEmployees"
                  label="Number of Employees"
                  placeholder="Enter the Number of Employees"
                  variant="h-[40px] w-full"
                />
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="industry"
                  label="Industry"
                  placeholder="Enter your industry"
                  variant="h-[40px] w-full"
                >
                  {Industries.map((industry, index) => (
                    <SelectItem key={industry + index} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>



              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="companyAddress"
                label="Company’s Address"
                placeholder="Enter your company address"
                variant="h-20 w-full"
              />
            </div>
          </div>
          

          {/* Submit Button Section */}
          <div className="bg-white px-4 sm:px-6 lg:px-8 py-6 flex justify-end items-center">
            <SubmitButton className="w-full sm:w-[150px] h-11" isLoading={isLoading}>
              Save Changes
            </SubmitButton>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Profile;

