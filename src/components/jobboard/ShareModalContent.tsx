/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

//Form Reusable
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFormSchema } from "@/lib/schemas";
import SubmitButton from "@/components/shared/SubmitButton"
import { teamMembers } from "@/constants";


const ShareModalContent = () => {
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      // event_title: "",
      // date: "",
      // time: "",
      // duration: "",
      // event_type: "",
      // guest_interviewer: "",
      // notes: "",
    },
  });

 

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="px-4 ">
      <h2 className="mb-2 font-rubik text-[18px]">Invite team members</h2>
      <hr />

      <div className=" rounded-md mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex  gap-2 items-center justify-between">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="guest_interviewer"
                label=""
                placeholder="Invite others by name or email"
                variant="h-[40px] w-full"
              />

              <SubmitButton className="lg:w-40 h-full rounded shadow-none">
                Invite
              </SubmitButton>
            </div>



            <div className="">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-6">Team members</h1>

      {/* Members List */}
      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-4"
          >
            {/* Left Section */}
            <div className="flex items-center">
              {/* Profile Circle */}
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 font-bold rounded-full mr-4">
                {member.initials}
              </div>
              {/* Name and Email */}
              <div>
                <p className="text-gray-800 font-medium">{member.name}</p>
                <p className="text-gray-600 text-sm">{member.email}</p>
              </div>
            </div>

            {/* Right Section (Role Dropdown Placeholder) */}
            <div className="text-gray-600 flex items-center space-x-2">
              <p className="capitalize">{member.role}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9.75l3.75 3.75 3.75-3.75"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>


          </form>
        </Form>
      </div>
    </div>
  );
};

export default ShareModalContent;
