const mongoose = require('mongoose');
const Schema = mongoose.Schema;

safeSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactionId:{
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('Safe', safeSchema);