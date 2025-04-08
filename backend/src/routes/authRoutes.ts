import express, { Router } from "express";
import { registerUser } from "../controller/registerController";

const router: Router = express.Router();

router.post("/register", registerUser);

export default router;
