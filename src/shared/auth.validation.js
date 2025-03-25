import * as Yup from "yup";

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^[a-zA-Z\s]*$/;
const stringPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
/**
 * Validation for login
 */
export const validationLogin = Yup.object({
  email: Yup.string()
    .trim()
    .required("Email Address is required.")
    .matches(emailRegex, "Please enter a valid email address."),
  password: Yup.string().trim().required("Password is required."),
});

export const validationSignup = Yup.object({
  name: Yup.string()
    .required("First name is required.")
    .matches(nameRegex, "Please enter a valid name."),

  email: Yup.string()
    .required("email address is required.")
    .matches(emailRegex, "Please enter a valid email address."),
  phoneNumber: Yup.string()
    .required("Phone number is required.")
    .matches(/^[6-9]\d{9}$/, "Please provide a valid phone number"),
  role: Yup.string().required("Role selection is required."),
  password: Yup.string()
    .trim()
    .required("Password is required.")
    .matches(
      stringPasswordRegex,
      "Password should contain at least 8 characters, including 1 special character and 1 capital letter."
    ),
  passwordConfirm: Yup.string()
    .required("Confirm Password is required.")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password do not match."
    ),
  // termsCheck: Yup.boolean().oneOf([true], AuthError.TERMS_CHECK_REQUIRED)
});
