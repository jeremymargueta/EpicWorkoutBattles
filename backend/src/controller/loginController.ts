import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "../models/UserModel";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const PEPPER_SECRET = process.env.PEPPER_SECRET || "";
    const isPasswordValid = await bcrypt.compare(
      password + PEPPER_SECRET,
      user.password
    );
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Add Jwt token generation here

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error: (error as Error).message,
    });
  }
};
