import express from 'express';
import dotenv from 'dotenv';
import path from 'path';


import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import connectDB from './lib/db.js';

dotenv.config();

const app = express();
const ___dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // middleware to parse JSON bodies


// routes
app.use("/api/v1/auth/", authRouter)
app.use("api/v1/messages", messageRouter)

// make ready for production

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(___dirname, '../frontend/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(___dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
  connectDB()
});