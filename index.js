import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import * as UserController from "./controllers/UserController.js";

import checkAuth from "./utils/checkAuth.js";

mongoose
  .connect(
    "mongodb+srv://ruslanlutfullin95:stepUP20@cluster0.wonzwey.mongodb.net/estimator?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB Error", err));

const app = express();
app.use(express.json()); // Letting express to read req json format

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  } 
  console.log("Server OK");
});
