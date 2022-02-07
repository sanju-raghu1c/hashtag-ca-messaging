const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const messageModel = require('../models/message.model');
const messageMappingModel = require('../models/messageMapping.model');
const cryptoHelperFunction = require('../HelperFunctions/cryptoHelperFunction')


exports.sendMessage = async function (req, res) {

    let response = { statusCode: 000, success: false, mgs: '' };
    try {
        if (req.userId.toString() === req.params.Uid) {

            const senderId = req.body.senderId;
            const recieverId = req.body.recieverId;
            const messageContent = req.body.messageContent;


            const encryptedMessage = cryptoHelperFunction.encrypt(messageContent);



            const messageBody =
            {
                message_content: encryptedMessage.iv + encryptedMessage.content
            }

            let messageModelObj = new messageModel(messageBody);
            let result = await messageModelObj.save();


            const messageMappingBody =
            {
                sender_id: senderId,
                recipient_id: recieverId,
                message_id: result._id,
                message_owner: senderId
            }

            let messageMappingModelObj = new messageMappingModel(messageMappingBody);
            await messageMappingModelObj.save();

            response.statusCode = 200;
            response.success = true;
            response.mgs = "message sent to user";


        }
        else {
            response.statusCode = 403;
            response.success = false;
            response.mgs = "Invalid user request";
        }

    } catch (error) {
        console.log(error)
        response.statusCode = 500;
        response.success = false;
        response.mgs = "Internal server error";

    }


    return res.status(response.statusCode).send(response);

};

exports.forwardMessage = async function (req, res) {

    let response = { statusCode: 000, success: false, mgs: '' };
    try {
        if (req.userId.toString() === req.params.Uid) {

            const senderId = req.body.senderId;
            const recieverId = req.body.recieverId;
            const forwardMessageMappingId = req.body.forwardMessageMappingId;


            let result = await messageMappingModel.findOne({ _id: forwardMessageMappingId })

            if (result) {
                const messageMappingBody =
                {
                    sender_id: senderId,
                    recipient_id: recieverId,
                    message_id: result.message_id,
                    is_forward: true,
                    message_owner: result.message_owner
                }

                let messageMappingModelObj = new messageMappingModel(messageMappingBody);
                await messageMappingModelObj.save();

                response.statusCode = 200;
                response.success = true;
                response.mgs = "message sent to user";
            }
            else {
                response.statusCode = 404;
                response.success = false;
                response.mgs = "Invalid Message Id";

            }






        }
        else {

            response.statusCode = 403;
            response.success = false;
            response.mgs = "Invalid user request";


        }
    } catch (error) {
        console.log(error)
        response.statusCode = 500;
        response.success = false;
        response.mgs = "Internal server error";

    }

    return res.status(response.statusCode).send(response);

};

exports.getMessageListByRecipientId = async function (req, res) {

    let response = { statusCode: 000, success: false, mgs: '', content: { messagesList: [] } };
    let userId = req.params.Uid;
    try {
        if (req.userId.toString() === req.params.Uid) {



            let messagesList = [];
            let messagsModelResultList = await messageMappingModel.find({ recipient_id: userId })
                .populate({ path: 'message_id', select: 'message_content _id' })
                .populate({ path: 'sender_id', select: 'first_name last_name _id' })
                .populate({ path: 'message_owner', select: 'first_name last_name _id' }).sort({
                    entry_date: -1,
                });



            messagsModelResultList.forEach(element => {

                let messageContent = cryptoHelperFunction.decrypt(element.message_id.message_content);
                let obj = {
                    "message_mapping_id": element._id,
                    "message_content": messageContent,
                    "sender_id": element.sender_id._id,
                    "sender_name": element.sender_id.first_name + " " + element.sender_id.last_name,
                    "message_owner": element.message_owner.first_name + " " + element.message_owner.last_name,
                    "message_owner_id": element.message_owner._id,
                    "entry_date": element.entry_date

                };
                messagesList.push(obj);
            });

            response.statusCode = 200;
            response.success = true;
            response.mgs = "Successfully retrive messages list.";
            response.content.messagesList = messagesList;






        }
        else {

            response.statusCode = 403;
            response.success = false;
            response.mgs = "Invalid user request";


        }
    } catch (error) {
        console.log(error);
        response.statusCode = 500;
        response.success = false;
        response.mgs = "Internal server error";

    }
    return res.status(response.statusCode).send(response);

};

