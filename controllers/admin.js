const Transfer = require('../models/transfer');
const bcrypt = require('bcryptjs');
const Transaction = require('../models/transaction');




exports.getSavings = (req, res, next) =>{

    Transfer.findOne()
        .then(transfer =>{
            res.render('user/savings',{
                path: '/savings',
                pageTitle: 'Start your online banking',
                isAuth: req.session.isLoggedIn,
                addCred: transfer
            });
        })
};

exports.getTransfer = (req, res, next) =>{
    req.user.populate()
    .execPopulate()
    .then(user =>{
        const amount = user;
        console.log(amount)
        res.render('admin/transfer',{
            path: '/transfer',
            pageTitle: 'Start transferring Money',
            isAuth: req.session.isLoggedIn,
            addCred: amount
        });
    });
};

exports.getPayRent = (req, res, next) =>{
    req.user.populate()
    .execPopulate()
    .then(user =>{
        const amount = user;
        console.log(amount)
        res.render('admin/pay-rent',{
            path: '/pay-rent',
            pageTitle: 'Pay your rent here!',
            isAuth: req.session.isLoggedIn,
            addCred: amount
        });
    })
};

exports.getPayMyAccount = (req, res, next) => {
    req.user.populate()
    .execPopulate()
    .then(user =>{
        const amount = user;
        // console.log(amount)
        res.render('admin/pay',{
            path: '/pay',
            pageTitle: 'Pay into your account',
            isAuth: req.session.isLoggedIn,
            addCred: amount
        });
    })
}

exports.postPayMyAccount = (req, res, next) =>{

    const accountNumber = req.body.accountNumber;
    const amount = req.body.amount;
    const pin = req.body.pin;
    const userId = req.body.user;

    Transaction.find()
        .then(transaction =>{
            const transactions = new Transaction({
                accountNumber: accountNumber,
                amount : amount,
                pin : pin,
                userId: req.user
            });
            
            let paidMoney = transactions.amount;
            let sumTrans = parseFloat(amount) + parseFloat(paidMoney);
            
            const fixedSum = sumTrans.toFixed(2);
            Transfer.findOne({sum: fixedSum});
            // console.log(fixedSum)

            Transfer.find()
                .then(trans =>{
                    const arrayTrans = trans;
                    const allTrans = arrayTrans.map(key =>{
                        console.log(key._doc);
                    })
                })

            // transactions.save();
            
            const transfer = new Transfer({
                amount: paidMoney,
                sum: fixedSum,
                user: {
                    name: req.user.name,
                    accountNumber: req.user.accountNumber,
                    userId: req.user
                }
            });
            transfer.save();

            return res.redirect('/savings')
        })
        .catch(err =>{
            console.log('Errors dey everywhere');
            next();
        });   
};