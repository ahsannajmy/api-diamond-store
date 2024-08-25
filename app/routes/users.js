import express from 'express';
import UserHandler from '../handler/userHandler.js';

const router = express.Router();

router.post('/register', UserHandler.registerUserHandler);
router.post('/login', UserHandler.loginUserHandler);

export { router as userRoute }