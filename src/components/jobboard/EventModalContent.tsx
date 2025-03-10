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
import { Tipinfo } from "../common/alerts";
// import { useRouter } from "next/navigation";

const EventModalContent = ({
  onClose,
  email,
  name,
  applicant_Id,
  firstName,
}: EventModalContentProps) => {
  // const router = useRouter();
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      start: {
        date_time: "",
      },
      duration: "",
      link: "",
      time: "",
      attendees: "",
    },
  });

  const { control } = form;

  const [createEvent, { isLoading }] = useEmployerCreateEventMutation();

  const onSubmit = async (data: any) => {
    const payload = {
      title: data.title,
      description: data.description,
      start: {
        date_time: data.start.date_time,
      },
      duration: data.duration,
      link: data.link,
      time: data.time,
      // attendees:  data.attendees.split(",")
      attendees: [email, ...data.attendees.split(",")]
        .map((item) => item.trim())
        .filter(Boolean),
      profile_Id: applicant_Id,
      // attendees: [data.candidateemail, ...data.attendees.split(",")].map(item => item.trim()).filter(Boolean)
    };

    try {
      await createEvent(payload).unwrap();
      onClose();
      // router.push("/scheduleinterview");
      window.location.href = "/scheduleinterview";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full px-4 max-w-2xl mx-auto overflow-y-auto  hide-scrollbar overflow-hidden">
      <h2 className="text-main-901 font-semibold font-rubik text-lg sm:text-xl md:text-2xl">
        {/* Provide key details to craft a customized interview */}
        Schedule a call with {name}
      </h2>

      <div className="w-full rounded-md mt-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={control}
              name="title"
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

            <div className="flex gap-3">
              <CustomFormField
                fieldType={FormFieldType.DATE}
                control={control}
                name="start.date_time"
                label="Date"
                placeholder="Select a date"
                variant="w-full h-[40px] border border-main-500 text-sm shadow-sm rounded"
                dateFormat="PPP"
                disabledDates={(date: Date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={control}
                type="time"
                name="time"
                label="Time"
                placeholder="Enter your Event Team"
                variant="h-[40px] w-full"
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={control}
                name="duration"
                label="Duration"
                placeholder="Duration"
                variant="h-[40px] w-full"
              >
                {Durations.map((duration, index) => (
                  <SelectItem key={`${duration}-${index}`} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>

            <div className="w-full flex flex-col gap-[.25em]">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={control}
                name="link"
                label="Meeting Link"
                placeholder="Enter the Meeting Link"
                variant="h-[40px] w-full"
              />
              {form.watch("link") && !form.watch("link")?.includes("https") && (
                <p className="text-red-800 text-[.75em]  font-300">
                  Is this a valid link ?
                </p>
              )}
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={control}
              name="attendees"
              label="Attendees"
              placeholder="e.g email 1, email 2, email 3 ..."
              variant="h-[40px] w-full"
            />

            <div className="w-full flex flex-wrap gap-[.5em] ">
              {firstName && (
                <p className="px-[.75em] py-[.25em] text-[.75em] text-main-900 rounded-full border-[.5px] border-sec-500">
                  {firstName}
                </p>
              )}
              {form
                .watch("attendees")
                ?.split(",")
                .map((item: string) => item.trim())
                .filter(Boolean)
                .map((item: string, id: number) => (
                  <p
                    className="px-[.75em] py-[.25em] text-[.75em] text-main-900 rounded-full border-[.5px] border-sec-500"
                    key={id.toString()}
                  >
                    {item}
                  </p>
                ))}
            </div>

            <div className="w-full flex items-start">
              <Tipinfo
                body="Add attendees email address separated by commas e.g email 1, email 2 e.t.c"
                noCenter={true}
              />
            </div>

            <div className="flex justify-end gap-2">
              <SubmitButton
                clickFn={onClose}
                className="w-full lg:w-40 mt-4 rounded bg-gray-300 text-gray-700"
              >
                Cancel
              </SubmitButton>

              <SubmitButton
                isLoading={isLoading}
                disabled={isLoading || !form.watch("link")?.includes("https")}
                className="w-full lg:w-40 mt-4 rounded"
              >
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
