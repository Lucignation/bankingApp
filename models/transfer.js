const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  amount: { 
      type: Number, 
      required: true 
    },
    sum: { 
      type: Number
    },
  user: {
    name: {
      type: String,
      required: true
    },
    accountNumber: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Transfer', orderSchema);
