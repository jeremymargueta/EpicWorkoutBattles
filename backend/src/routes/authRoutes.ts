import express, { Router } from "express";
import { registerUser } from "../controller/registerController";
import { loginUser } from "../controller/loginController";

const router: Router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser);

export default router;
