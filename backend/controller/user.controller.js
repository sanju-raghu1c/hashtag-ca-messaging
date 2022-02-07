const bcrypt = require('bcryptjs');
const { Console } = require('console');
const userModel = require('../models/user.model');
const userLoginModel = require('../models/userLogin.model');
const bycryptHelperFunction = require('../HelperFunctions/bycryptHelperFunction')
const jwtTokentHelperFunction = require('../HelperFunctions/jwtTokenHelperFunction')

exports.userLogin = async function (req, res) {

    let response = {statusCode : 000,success : false ,mgs : '',content: {refreshToken:"",accessToken:""}};
    
    try {
      
     
        const emailId = req.body.emailId;
        const password = req.body.password;
        const user = await userModel.findOne({ email_id: emailId });


        if (user) {
          const userPassword = await userLoginModel.findOne({user_id : user._id});
          if (userPassword !== 0) {
            const isMatch = await bycryptHelperFunction.stringCompareWithHasedString(password,userPassword.password);  
            if (isMatch) {

                const refreshToken = jwtTokentHelperFunction.generateRefreshToken(user._id);
                const accessToken = jwtTokentHelperFunction.generateAccessToken(user._id);
       
              res.cookie('refreshToken', refreshToken, {
                  httpOnly: true,
                  path: '/',
                  sameSite: 'Lax',
                  maxAge: 18000000,
                });
                res.cookie('accessToken', accessToken, { sameSite: 'Lax', path: '/', maxAge: 7200000 });
                
                
                response.statusCode = 200;
                response.success = true;
                response.mgs = "user verified";
                response.content = user;
                response.refreshToken = refreshToken;
                response.accessToken = accessToken;
            }
            else
            {
                response.statusCode = 400;
                response.success = false;
                response.mgs = 'Invalid credentials';
            }
          } else {

                response.statusCode = 402;
                response.success = false;
                response.mgs = 'User not found';
 
          }
        } else {

            response.statusCode = 402;
            response.success = false;
            response.mgs = "User doesn't exists";

        }
       
        
      } catch (error) {
           console.log("error : ",error);
            response.statusCode = 500;
            response.success = false;
            response.mgs = "Internal server error";
    }


    return res.status(response.statusCode).send(response);

  };


  exports.userList = async function (req, res) {

    let response = {statusCode : 000,success : false ,mgs : '',content : { userList : [] }};

    try {
    if (req.userId.toString() === req.params.Uid) {

       const users = await userModel.find({});

        response.content.userList = users;
        response.statusCode = 200;
        response.success = true;
        response.mgs = "Successfully retrive the data";

    }
    else
    {
        response.statusCode = 403;
        response.success = false;
        response.mgs = "Invalid user request";
    }
    
} catch (error) {
    console.log("error : ",error);
     response.statusCode = 500;
     response.success = false;
     response.mgs = "Internal server error";
}
    return res.status(response.statusCode).send(response);

  };