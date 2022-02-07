const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

let messageSchema = new mongoose.Schema(
  {
    
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    recipient_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    is_forward : {
      type: Boolean,
      default: false,
      required: true,
  },
    message_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Messages',
      required: true,
      },
      message_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
      entry_date: {
        type: Date,
        default: Date.now,
        required: true,
      },
  },
  { collection: 'message_mapping' }
);

userSchema = mongoose.model('MessagesMapping', messageSchema);

module.exports = userSchema;
