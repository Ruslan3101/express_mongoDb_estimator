import mongoose from "mongoose";
// import EmployeesModel from "./Employee.js";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    role: String,
    companyName: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
