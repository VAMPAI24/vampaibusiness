

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/inputs/CustomFormField";
import SubmitButton from "../shared/SubmitButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "@/components/ui/select";
import { EventFormSchema } from "@/lib/schemas";
import { Durations } from "@/constants";
import { EventModalContentProps } from "@/types";
import { useEmployerCreateEventMutation } from "@/redux/features/job-posting/jobpostingApi";

const EventModalContent = ({ onClose }: EventModalContentProps) => {
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      summary: "",
      description: "",
      start: {
        date_time: "",
      },
      duration: "",
      attendees: "",
    },
  });

  const { control } = form;


  const [createEvent, { isLoading }] = useEmployerCreateEventMutation();

  const onSubmit = async (data: any) => {
    const payload = {
      summary: data.summary,
      description: data.description,
      start: {
        date_time: data.start.date_time,
      },
      duration: data.duration,
      // attendees:  data.attendees.split(",")
      attendees: [...data.attendees.split(",")].map(item => item.trim()).filter(Boolean)
      // attendees: [data.candidateemail, ...data.attendees.split(",")].map(item => item.trim()).filter(Boolean)
    };


    try {
      await createEvent(payload).unwrap();
      onClose()
    } catch (error) {
      console.error(error);
    }

  
  };

  return (
    <div className="px-4 max-w-2xl mx-auto overflow-y-auto lg:h-full h-screen hide-scrollbar">
      <h2 className="text-main-901 font-semibold font-rubik text-lg sm:text-xl md:text-2xl">
        Provide key details to craft a customized interview
      </h2>

      <div className="rounded-md mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={control}
              name="summary"
              label="Event Title"
              placeholder="Enter your Event Title"
              variant="h-[40px] w-full"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={control}
              name="description"
              label="Description"
              placeholder="Enter the description"
              variant="h-[40px] w-full"
            />

            <CustomFormField
              fieldType={FormFieldType.DATE}
              control={control}
              name="start.date_time"
              label="Date"
              placeholder="Select a date"
              variant="w-full h-[40px] border border-main-500 text-sm shadow-sm rounded"
              dateFormat="PPP"
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={control}
              name="duration"
              label="Duration"
              placeholder="Duration"
              variant="h-[40px]"
            >
              {Durations.map((duration, index) => (
                <SelectItem key={`${duration}-${index}`} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={control}
              name="attendees"
              label="Attendees"
              placeholder="Enter attendee email"
              variant="h-[40px] w-full"
            />

          

            <div className="flex justify-end gap-2">
              <SubmitButton
                clickFn={onClose}
                className="w-full lg:w-40 mt-4 rounded bg-gray-300 text-gray-700"
              >
                Cancel
              </SubmitButton>

              <SubmitButton isLoading={isLoading}   className="w-full lg:w-40 mt-4 rounded">
                Schedule
              </SubmitButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EventModalContent;



