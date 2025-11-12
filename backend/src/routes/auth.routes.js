import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.get("/sign-in", (req, res) => {
  res.send( "Sign-in endpoint" );
});

authRouter.get("/logout", (req, res) => {
  res.send( "Logout endpoint" );
});

export default authRouter;