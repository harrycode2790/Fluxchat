import { Router } from "express";

const authRouter = Router();

authRouter.get("/sign-up", (req, res) => {
  res.send( "Sign-up endpoint" );
});

authRouter.get("/sign-in", (req, res) => {
  res.send( "Sign-in endpoint" );
});

authRouter.get("/logout", (req, res) => {
  res.send( "Logout endpoint" );
});

export default authRouter;