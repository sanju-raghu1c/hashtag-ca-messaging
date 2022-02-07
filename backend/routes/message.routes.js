const express = require('express');
const router = express.Router();
const middleware = require("./middleware.routes");
const messageController = require('../controller/message.controller');


router.use(middleware.authenticateToken);
router.post('/send-message/:Uid', messageController.sendMessage);
router.get('/message-listing/:Uid', messageController.getMessageListByRecipientId);
router.post('/forward-message/:Uid', messageController.forwardMessage);

module.exports = router;