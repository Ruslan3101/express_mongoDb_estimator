import mongoose from "mongoose";
const EmployeesSchema = new mongoose.Schema({

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
})

export default mongoose.model("Employees", EmployeesSchema)