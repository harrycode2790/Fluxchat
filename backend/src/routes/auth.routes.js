import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const authRouter = Router();


authRouter.post("/sign-up", signUp);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/check", authorize, (req, res) => res.status(200).json(req.user) )

export default authRouter;
