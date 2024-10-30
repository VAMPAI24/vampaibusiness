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





export const SignInSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address") 
    .min(5, "Email must be at least 5 characters long") 
    .max(100, "Email cannot exceed 100 characters")
    .refine((value) => {
      const validationResponse = isValidEmailDomain(value);
      return typeof validationResponse === "boolean" ? validationResponse : false;
    }, {
      message: "Please check your email address and try again", 
      path: ["email"], 
    }),
  password: z.string()
    .min(8, "Password must be at least 8 characters long") 
    .max(50, "Password cannot exceed 50 characters") 
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") 
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") 
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"), 
});






export const SignUpSchema = z.object({
  company_name: z.string(),
  email: z.string()
    .email("Please enter a valid email address") 
    .min(5, "Email must be at least 5 characters long") 
    .max(100, "Email cannot exceed 100 characters")
    .refine((value) => {
      const validationResponse = isValidEmailDomain(value);
      return typeof validationResponse === "boolean" ? validationResponse : false;
    }, {
      message: "Please check your email address and try again", 
      path: ["email"], 
    }),
  password: z.string()
    .min(8, "Password must be at least 8 characters long") 
    .max(50, "Password cannot exceed 50 characters") 
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") 
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") 
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"), 
});



export const ResetPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email is required") 
    .email("Please enter a valid email address") 
    .max(100, "Email cannot exceed 100 characters"), 
});



export const SetNewPasswordSchema = z.object({
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password cannot exceed 32 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
      
    confirmpassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"], 
  });




