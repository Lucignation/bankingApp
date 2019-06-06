const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchecme = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pin:{
        type: Number,
        required: true
    },
    accountNumber:{
        type: Number,
        required: true
    },
    amount:{
        type: Number
    },
    resetToken: String,
    resetTokenExpiration: Date,
    account:{
        transaction:[{
            transactionId:{
                    type: Schema.Types.ObjectId,
                    ref: 'Transaction',
                    required: true
                },
                amount:{
                    type: Number,
                    required: true
                }
            }]
    }
});

userSchecme.method.getAmountPaid = function(transaction){
    const AmountTransferredIndex = this.account.transaction.findIndex(trans => {
        return trans.transactionId.toString() === transaction._id.toString();
    });
    let newTransaction = 1;
    const updatedTranfer = [...this.amount.transaction];
    
    if(AmountTransferredIndex >= 0){
        newTransaction = this.account.transaction[AmountTransferredIndex].amount + 1;
        updatedTranfer[AmountTransferredIndex].amount = newTransaction;
    }else{
        updatedTranfer.push({
            transactionId: transaction._id,
            transaction: newTransaction
        });
    }
    const updatedAmount = {
        transaction: updatedTranfer
    };
    this.transaction = updatedAmount;
    return this.save();
}


module.exports = mongoose.model('User', userSchecme);