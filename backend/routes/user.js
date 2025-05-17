const express = require('express');
const router = express.Router();
const { register, login, logout, forgotPassword, resetPassword,userDetail } = require('../controllers/user');
const {authenticationMid} = require('../middleware/auth');


router.post ("/register", register);
router.post ("/login", login);
router.post("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post('/reset/:token',resetPassword);
router.get('/me', authenticationMid,userDetail);




module.exports = router; 
