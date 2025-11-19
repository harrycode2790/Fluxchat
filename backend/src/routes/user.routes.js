import { Router } from "express";
import { updateUserProfilePic } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.put("/profile/update", authorize, updateUserProfilePic );




export default userRouter;