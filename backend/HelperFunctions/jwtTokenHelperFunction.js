const crypt = require('crypto');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cookieParser);
app.use(express.json());
exports.generateAccessToken = (Uid) => {
    try {
     const token =  jwt.sign({ user: Uid  }, process.env.TOKEN_SECRET , { expiresIn: '5m' });
      return  token.toString();
    } catch (err) {
        console.log(err)
    }
  }
  
  
  
  exports.generateRefreshToken = function (Uid) {
    try {
      const refreshToken =  jwt.sign({ user: Uid }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
      return refreshToken.toString();
    } catch (err) {
        console.log(err)
    }
  };
  