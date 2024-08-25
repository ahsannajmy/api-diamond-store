const express = require('express');
const router = express.Router();
const UserHandler = require('../handler/userHandler.js');

router.post('/register', UserHandler.registerUserHandler);

module.exports = router