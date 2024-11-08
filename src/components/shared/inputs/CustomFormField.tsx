"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { E164Number } from "libphonenumber-js/core";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  RADIO = "radio",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  render?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  variant?: string;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [value, setValue] = useState()

  
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className={`${props.variant} text-16 placeholder:text-16 rounded-[5px] border bg-[#F7FCFF] border-bankGradient text-gray-900 placeholder:text-gray-500`}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
        <div className="flex w-full items-center gap-3">
          <div className="flex items-center">
            <PhoneInput
              defaultCountry="NG"
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="w-14 h-11 rounded-[5px] px-3 text-16 placeholder:text-16 border bg-[#F7FCFF] border-bankGradient text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <input
            type="tel"
            value={field.value}
            onChange={field.onChange}
            placeholder={props.placeholder}
            className="w-full h-11 rounded-[5px] px-3 text-16 placeholder:text-16 border bg-[#F7FCFF] border-bankGradient text-gray-900 placeholder:text-gray-500"
          />
        </div>
      </FormControl>

       
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            disabled={props.disabled}
            className={`${props.variant} border bg-[#F7FCFF] rounded-[5px] border-bankGradient placeholder:text-dark-600 focus-visible:ring-0 focus-visible:ring-offset-0`}

          />
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={` ${props.variant} cursor-pointer text-16 placeholder:text-16 rounded-[5px] border bg-[#F7FCFF] border-bankGradient text-gray-900 placeholder:text-gray-500`}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="text-16 bg-[#F7FCFF] border-bankGradient text-gray-900">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.RADIO:
      return props.render ? props.render(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
