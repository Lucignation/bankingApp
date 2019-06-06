const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');

const User = require('./models/user');

const MONGODN_URI = 'mongodb://localhost:27017/banking';

const app = express();
const store = new MongoDBStore({
    uri: MONGODN_URI,
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'mygodisawesomehemovemountain', resave: false, saveUninitialized: false, store: store}))

app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(adminRouter);
app.use(authRouter);


app.listen(4000);

setTimeout(function(){
    mongoose
    .connect(MONGODN_URI, {useNewUrlParser:true});
}, 4000);



