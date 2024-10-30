import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  rightIcon?: React.ReactNode;
  type?: string;
  variant?: string;
}

const CustomInput = <T extends FieldValues>({
  control,
  type,
  name,
  label,
  placeholder,
  variant = "",
  rightIcon,
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className={`${variant} text-16 placeholder:text-16 rounded-[5px] border bg-[#F7FCFF] border-bankGradient text-gray-900 placeholder:text-gray-500`}
                type={type}
                rightIcon={rightIcon}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-12 text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
