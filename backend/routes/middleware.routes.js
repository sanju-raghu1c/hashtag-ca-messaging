const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());
const dotenv = require('dotenv');
dotenv.config();



async function authenticateToken(req, res, next) {

  let message;
  try {
    const token = req.cookies.accessToken.toString();
    console.log("authenticateToken token : ",token);
    if (token === '') {
      message = 'Request Denied -- No Token Received';
      return res.status(403).send('Access Error : Cannot read toString');
    }
    jwt.verify(token, process.env.TOKEN_SECRET, { algorithms: 'HS256' },async (err, data) => {
    
      
      if (err) {
        message = 'Request Denied -- Token signature mismatch';
        return res.status(403).send('Access Error : Token not verified');
      }
    else
    {

      req.userId = data.user;
      next();
     
    }
     console.log("authenticateToken : ",data);
     
    });
  } catch (err) {
    console.log(err);
    message = 'Authenticate Token -- Internal Server Error';
    return res.status(500).send('authenticateToken Internal Server Error');
  } 
}

module.exports = { authenticateToken };
