const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    accountNumber:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    pin:{
        type:Number,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transferId:{
        type: Schema.Types.ObjectId,
        ref: 'Transfer'
    }
});

transactionSchema.methods.addAmountPaid = function(transactionId){
    const amount = req.bod.amount;
    const amounts = this.amount.map(newAmount =>{
        return{...newAmount}
    });
    if(amounts >= 0 ){
        amounts += amount
    }
};

module.exports = mongoose.model('Transaction', transactionSchema);