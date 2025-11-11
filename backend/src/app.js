import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/v1/auth/", authRouter)
app.use("api/v1/messages", messageRouter)

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});