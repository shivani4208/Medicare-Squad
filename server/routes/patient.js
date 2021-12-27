const express = require('express');
const router = express.Router();
const register_controller = require('../controllers/patientAuth/register');
const login_controller = require('../controllers/patientAuth/login');
var path = require('path');
const Patient = require('../model/patInfo')

router.post('/register', register_controller.handleRegister);
router.get('/register',(req,res)=>{
    res.render('patientSignUp.ejs');
});

router.post('/login', login_controller.handleSignin);
router.get('/login',(req,res)=>{
res.render('patientLogin.ejs');
});
router.get('/',(req,res)=>{
    console.log(req.body._id)
    res.render('index.ejs',{member:req.body})
})
module.exports = router;