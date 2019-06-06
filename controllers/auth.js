const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getIndex = (req, res, next) =>{
    res.render('auth/index', {
        path: '/',
        pageTitle: 'Login to do your transaction',
        isAuth: false
    });
};


// exports.postLogin = (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     User.findOne({ email: email })
//       .then(user => {
//         if (!user) {
//           return res.redirect('/');
//         }
//         bcrypt
//           .compare(password, user.password)
//           .then(doMatch => {
//             if (doMatch) {
//               req.session.isLoggedIn = true;
//               req.session.user = user;
//               return req.session.save(err => {
//                 console.log(err);
//                 res.redirect('/savings');
//               });
//             }
//             res.redirect('/');
//           })
//           .catch(err => {
//             console.log(err);
//             res.redirect('/');
//           });
//       })
//       .catch(err => console.log(err));
//   };

exports.postLogin = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user =>{
            if(!user){
                return res.redirect('/');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch =>{
                    if(doMatch){
                        req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err =>{
                        console.log('What coulbe the reason');
                        res.redirect('/savings');
                    });
                    } 
                    console.log('Im going back home');
                    res.redirect('/');
                });
            
        }).catch(error =>{
            console.log('EEERRRRREEERRRR');
            res.redirect('/');
        });
};

exports.postLogout = (req, res, next) =>{
    req.session.destroy(err =>{
        console.log(err);
        res.redirect('/');
    });
}


exports.getSignup = (req, res, next) =>{
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'SignUp to start managing your account',
        isAuth: false
    });
};

exports.postSignup = async (req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const pin = req.body.pin;
    const accountNumber = req.body.accountNumber;
    const amount = req.body.amount;

    const existingUser = await User.findOne({email:email});
    if(existingUser){
        console.log('There is error here');
        // const error = new Error('A user with this credentials exists already, please enter a new one!');
        // error.code = 401;
        // throw error;
        return res.redirect('/');
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await User({
        name: name,
        email: email,
        password: hashPassword,
        pin: pin,
        accountNumber: accountNumber,
        amount: amount,
        account: {transaction:[]}
    });
    await user.save();
    return res.redirect('/');
}