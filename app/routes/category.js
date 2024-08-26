import express from 'express';
import CategoryHandler from '../handler/categoryHandler.js';

const router = express.Router();

router.get('', CategoryHandler.retrieveCategoryHandler);

export { router as categoryRoute }