/* eslint-disable */
import * as Yup from "yup";

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




