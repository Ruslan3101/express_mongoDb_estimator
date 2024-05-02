import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
      role: req.body.role,
      companyName: req.body.companyName,
      // employees: req.body.employees,
    });

    const user = await doc.save(); // saving user to mongoDB

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Not able to register",
    });
    // catchError(err, 500, "Not able to register");
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Email is not valid or already taken",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Wrong email or password",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...UserData } = user._doc;
    res.json({
      ...UserData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Not able to Log in",
    });
    // catchError(err, 500, "Not able to Log in");
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json({ userData });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Access Denied",
    });
  }
};
