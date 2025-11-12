import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;
