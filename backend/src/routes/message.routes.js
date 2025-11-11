import { Router } from "express";

const messageRouter = Router();

messageRouter.get("/send", (req, res) => {
  res.send("Get all messages endpoint");
});



export default messageRouter;