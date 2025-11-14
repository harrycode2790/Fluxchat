import { Router } from "express";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners
} from "../controllers/message.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const messageRouter = Router();

messageRouter.use(authorize)

messageRouter.get("/contacts",  getAllContacts);

messageRouter.get("/chats",  getChatPartners);

messageRouter.get("/user/:id",  getMessagesByUserId);

messageRouter.post("/send/:id",  sendMessage);

export default messageRouter;
