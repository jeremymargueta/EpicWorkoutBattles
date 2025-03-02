import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, User } from "../models/UserModel";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Taco3");
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = { username, email, password: hashedPassword };
    await createUser(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: (error as Error).message,
    });
  }
});

export default router;
