import express from 'express';
import ServiceHandler from '../handler/serviceHandler.js';

const route = express.Router();

route.get('', ServiceHandler.retrieveServiceHandler);

export { route as serviceRoute }