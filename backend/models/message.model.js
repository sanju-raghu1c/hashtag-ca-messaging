const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

let messageSchema = new mongoose.Schema(
  {
    
    message_content : {
        type: String,
        required: true,
      },
 
    
  },
  { collection: 'message' }
);

userSchema = mongoose.model('Messages', messageSchema);

module.exports = userSchema;
