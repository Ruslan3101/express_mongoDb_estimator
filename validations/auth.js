import { body } from "express-validator";

export const registerValidation = [
  body("email", "Email is not valid or already taken.").isEmail(),
  body(
    "password",
    "Password must meet the specified strength requirements"
  ).isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  body("fullName", "Enter full name").isLength({ min: 3 }),
  body("avatarUrl", "Link is invalid ").optional().isURL(),
  body("role", "You are not an admin").optional().exists({ value: "admin" }),
  body("companyName", "You are not an admin to set a Company Name").optional().isLength({ min: 3 }),
//   body("employees", "You are not an admin").exists({ role: "admin" }),
];
