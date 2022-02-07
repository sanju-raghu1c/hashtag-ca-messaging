const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

let userLoginSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  
  },
  { collection: 'user_login' }
);

let userLogin = mongoose.model('UserLogin', userLoginSchema);

module.exports = userLogin;
