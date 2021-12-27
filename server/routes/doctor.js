const express = require('express');
const router = express.Router();
// const path = require('path');
const register_controller = require('../controllers/doctorAuth/register');
const login_controller = require('../controllers/doctorAuth/login');
var path = require('path');

router.post('/register', register_controller.handleRegister);
router.get('/register',(req,res)=>{
res.render('doctorSignUp.ejs')
});

router.post('/login', login_controller.handleSignin);
router.get('/login',(req,res)=>{
res.render('doctorLogin.ejs')
});

module.exports = router;