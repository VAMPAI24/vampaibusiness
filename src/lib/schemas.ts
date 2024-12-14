/* eslint-disable */
import * as Yup from "yup";
import { z } from "zod";

function isValidEmailDomain(value?: string): boolean | string {
  if (value) {
    const domain = value.split("@")[1];
    if (
      !(
        domain &&
        (domain.includes(".com") ||
          domain.includes(".co") ||
          domain.includes(".org") ||
          domain.includes(".io"))
      )
    ) {
      return "Invalid email domain";
    }
  }
  return true;
}
export const waitlistSchema = Yup.object().shape({
  company_email: Yup.string()
    .email("Invalid email format")
    .required("Email is required")
    .test(
      "domain",
      "Please check your email address and try again",
      (value: string): boolean | Yup.ValidationError => {
        const validationResponse = isValidEmailDomain(value);
        if (typeof validationResponse === "string") {
          return new Yup.ValidationError(validationResponse, value, "email");
        }
        return validationResponse;
      }
    ),
  full_name: Yup.string()
    .required("Fullname is required")
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'should be in the form "john doe"'),
  company_name: Yup.string().required("Company name is required"),
  industry: Yup.string().required("Industry is required"),
  role: Yup.string().required("Role is required"),
  company_size: Yup.string().required("Company size is required"),
});

const isValidEmailDomainSignUp = (email: string) => {
  const restrictedDomains = [
    "gmail.com",
    "outlook.com",
    "yopmail.com",
    "yahoo.com",
    "hotmail.com",
  ];

  const domain = email.split("@")[1];
  return domain && !restrictedDomains.includes(domain.toLowerCase());
};

//sign-in
export const SignInSchema = z.object({
  work_email: z
    .string()
    .email("Please enter a valid work email address")
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email cannot exceed 100 characters")
    .refine((value) => isValidEmailDomainSignUp(value), {
      message: "Please use a company email address",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

// Signup
export const SignUpSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  work_email: z
    .string()
    .email("Please enter a valid work email address")
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email cannot exceed 100 characters")
    .refine((value) => isValidEmailDomainSignUp(value), {
      message: "Please use a company email address",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

export const ResetPasswordSchema = z.object({
  work_email: z
    .string()
    .min(1, "Work Email is required")
    .email("Please enter a valid work email address")
    .max(100, "Email cannot exceed 100 characters")
    .refine((value) => isValidEmailDomainSignUp(value), {
      message: "Please use a company email address",
    }),
});

export const SetNewPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password cannot exceed 32 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),

    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const ProfileSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be 50 characters or less" }),

  last_name: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be 50 characters or less" }),

  Position_in_company: z
    .string()
    .min(1, { message: "Position in company is required" })
    .max(100, {
      message: "Position in company must be 100 characters or less",
    }),

  work_email: z.string().email({ message: "Invalid email address" }),



  phone_Number: z
  .string()
  .regex(/^\+?[0-9]{10,50}$/, {
    message: "Phone number must contain only numbers and may start with +, and must be between 10 and 50 digits long.",
  }),

  company_name: z
    .string()
    .min(1, { message: "Company name is required" })
    .max(100, { message: "Company name must be 100 characters or less" }),

  company_website: z
    .string()
    .min(1, { message: "Company website is required" })
    .max(100, { message: "Company website must be 100 characters or less" }),

    No_Employees: z
    .union([z.enum(["1-10", "11-50", "51-100", "100+"]), z.literal("")])
    .optional()
    .or(z.undefined()),

  industry: z
    .string()
    .min(1, { message: "Industry is required" })
    .max(100, { message: "Industry must be 100 characters or less" }),

  country: z
    .string()
    .min(1, { message: "Country is required" })
    .max(100, { message: "Country must be 100 characters or less" }),

    company_bio: z
    .string()
    .min(1, { message: "company bio is required" })
    .max(200, { message: "company_bio must be 200 characters or less" }),
});





export const jobTitleSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
});

export const jobDetailsSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  workPattern: z.string().min(1, "Work pattern is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  currency_code: z.string().optional(),
  salary_min: z
    .string() 
    .optional(),  
  salary_max: z
    .string() 
    .optional(), 
    applicationDeadline: z
    .string()
    .min(1, "Application deadline is required")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Application deadline must be in the format DD/MM/YYYY"
    ),
});

export const jobSpecificationSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  workPattern: z.string().min(1, "Work pattern is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  currency_code: z.string().optional(),
  salary_min: z
    .string() 
    .optional(),  
    salary_max: z
    .string() 
    .optional(), 
    applicationDeadline: z
    .string()
    .min(1, "Application deadline is required")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Application deadline must be in the format DD/MM/YYYY"
    ),
    jobDescription: z
    .string()
    .min(10, "Job Description must be at least 10 characters long")
    .max(5000, "Job Description cannot exceed 5000 characters"),
    requiredSkills: z
    .string()
    .min(10, "Required Skills must be at least 10 characters long")
    .max(5000, "Required Skills cannot exceed 5000 characters"),
});

export const benefitDetailsSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  workPattern: z.string().min(1, "Work pattern is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  currency_code: z.string().optional(),
  salary_min: z
    .string() 
    .optional(),  
    salary_max: z
    .string() 
    .optional(), 

    applicationDeadline: z
    .string()
    .min(1, "Application deadline is required")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Application deadline must be in the format DD/MM/YYYY"
    ),

    jobDescription: z
    .string()
    .min(10, "Job Description must be at least 10 characters long")
    .max(5000, "Job Description cannot exceed 5000 characters"),
    requiredSkills: z
    .string()
    .min(10, "Required Skills must be at least 10 characters long")
    .max(5000, "Required Skills cannot exceed 5000 characters"),
    benefits: z
    .string()
    .optional(),
});







// export const EventFormSchema = z.object({
//   summary: z.string().min(1, "Event Title is required"),
//   date: z.preprocess(
//     (value) => (value instanceof Date ? value.toISOString().split("T")[0] : value),
//     z.string().min(1, "Date is required")
//   ),
 
//   time: z.string().min(1, "Time is required"),
//   duration: z.string().min(1, "Duration is required"),
//   event_type: z.string().min(1, "Event Type is required"),
//   guest_interviewer: z.string().min(1, "Guest/Interviewer is required"),
//   description: z.string().min(1, "Notes Title is required"),
// });



export const EventFormSchema = z.object({
  summary: z.string().min(1, "Event Title is required"),
  start: z.object({
    date_time: z.preprocess(
      (value) => (value instanceof Date ? value.toISOString() : value),
      z.string().min(1, "Start date and time are required")
    ),
  }),
  duration: z.string().min(1, "Duration is required"),
  attendees: z.string().min(1, "Attendees is required"),
  description: z.string().min(1, "Description is required"),
});












