const express = require('express');
const router = express.Router();


const adminBanking = require('../controllers/admin');




router.get('/savings', adminBanking.getSavings);
router.get('/transfer', adminBanking.getTransfer);
router.get('/pay-rent', adminBanking.getPayRent);
router.get('/pay', adminBanking.getPayMyAccount);
router.post('/pay', adminBanking.postPayMyAccount);


module.exports = router;
