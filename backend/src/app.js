import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import connectDB from "./lib/db.js";
import { ENV } from "./lib/env.js";
import userRouter from "./routes/user.routes.js";
import { app, server } from "./lib/socket.js";


const ___dirname = path.resolve();
const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
; // middleware to parse JSON bodies
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser()); // middleware to parse cookies
// routes
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/messages/", messageRouter);
app.use("/api/v1/users/", userRouter);

// make ready for production

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(___dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(___dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
