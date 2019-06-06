const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/auth');


router.get('/', AuthController.getIndex);
router.post('/', AuthController.postLogin);
router.get('/signup', AuthController.getSignup);
router.post('/signup', AuthController.postSignup);
router.post('/logout', AuthController.postLogout);


module.exports = router;