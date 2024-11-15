"use client";
import React, { useEffect } from "react";
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
import { Countries, Industries, numberOfEmployees } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import CustomInput from "@/components/shared/inputs/CustomInput";

const Profile = () => {
  const router = useRouter();

  const [updateProfile, { data, isLoading }] = useUpdateProfileMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  console.log("data", data);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      Position_in_company: "",
      work_email: "",
      phone_Number: "",
      country: "",
      company_name: "",
      company_website: "",
      No_Employees: "",
      industry: "",
      company_bio: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (userInfo) {
      setValue("first_name", userInfo.first_name || "");
      setValue("last_name", userInfo.last_name || "");
      setValue("Position_in_company", userInfo.Position_in_company || "");
      setValue("work_email", userInfo.work_email || "");
      setValue("phone_Number", userInfo.phone_Number || "");
      setValue("country", userInfo.country || "");
      setValue("company_name", userInfo.company_name || "");
      setValue("No_Employees", userInfo.No_Employees || "");
      setValue("industry", userInfo.industry || "");
      setValue("company_bio", userInfo.company_bio || "");
    }
  }, [userInfo, setValue]);

  const onSubmit = async function (values: z.infer<typeof ProfileSchema>) {
    try {
      console.log(values);
      const response = await updateProfile(values).unwrap();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // const [isLoading, setIsLoading] = useState(false);

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

              {/* Additional Fields for Personal Information */}
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row xl:flex-row mb-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="Position_in_company"
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
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="company_name"
                  label="Company’s Name"
                  placeholder="Enter your Company’s Name"
                  variant="h-[40px] w-full"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="company_website"
                  label="Company’s Website"
                  placeholder="Enter your Company’s Website"
                  variant="h-[40px] w-full"
                />
              </div>

              {/* Industry and Country Selection Fields */}
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row mb-4">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="No_Employees"
                  label="Number of Employees"
                  placeholder="Enter the Number of Employees"
                  variant="h-[40px] w-full"
                >
                  {numberOfEmployees.map((employ, index) => (
                    <SelectItem key={employ + index} value={employ}>
                      {employ}
                    </SelectItem>
                  ))}
                </CustomFormField>
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

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="company_bio"
                label="Company’s Bio"
                placeholder="Enter your company  Bio"
                variant="h-20 w-full"
              />


              {/* image */}
              {/* <CustomInput
                control={form.control}
                name="resume"
                label="Upload Resume"
                placeholder="Select your resume file"
                type="file"
                variant="h-[50px]"
              /> */}
            </div>
          </div>

          {/* Submit Button Section */}
          <div className="bg-white px-4 sm:px-6 lg:px-8 py-6 flex justify-end items-center">
            <SubmitButton
              className="w-full sm:w-[150px] h-11"
              isLoading={isLoading}
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
