import express from 'express';
import dotenv from 'dotenv';
import { userRoute } from './routes/users.js';

dotenv.config();
const app = express();
const port = process.env.APP_PORT;

// middleware
app.use(express.json());
app.use((req,res,next) => {
  console.log(`Request berjalan pada path ${req.path} dengan method ${req.method}`);
  next();
})

// group endpoint
app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
})