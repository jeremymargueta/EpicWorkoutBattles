import { Request, Response } from "express";
import { createUser, findUserByEmail, User } from "../models/UserModel";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Taco3");
    const { username, fname, lname, email, password } = req.body;

    if (!username || !fname || !lname || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      username,
      fname,
      lname,
      email,
      password: hashedPassword,
    };
    await createUser(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: (error as Error).message,
    });
  }
};
