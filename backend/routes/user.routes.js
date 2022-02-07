const express = require('express');
const router = express.Router();
const middleware = require("./middleware.routes");
const userController = require('../controller/user.controller');


router.post('/login', userController.userLogin);
router.get('/user-list/:Uid',middleware.authenticateToken, userController.userList);


module.exports = router;

