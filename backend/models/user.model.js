const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

let userSchema = new mongoose.Schema(
  {
    
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
 
    date_of_birth: {
      type: Date,
      default: new Date(),
      required: true,
    },
  
    email_id: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    
  },
  { collection: 'user' }
);

userSchema = mongoose.model('Users', userSchema);

module.exports = userSchema;
