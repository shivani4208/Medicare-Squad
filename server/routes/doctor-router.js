const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DoctorInfo = require('../model/doctorSchema');
const Doctor = require('../model/docInfo')
// router.get('/:user',(req,res)=>{
//     Doctor.findOne(req.params.user,(err,doc)=>{
//         let eid=req.params.user;
//         if(!err) return res.render('main.ejs',{email:eid})
//     })
// })
router.get('/',(req,res)=>res.render('main.ejs'))
router.get('/profile',(req,res)=>{
    res.render('profile.ejs')
})
router.get('/editProfile',(req,res)=>{
    res.render('editProfile.ejs')
})
router.get('/profile/data',(req,res)=>{
    res.render('data.ejs')
})
router.post('/profile',(req,res)=>{
    insertRecord(req,res);
})
router.post('/editProfile',(req,res)=>{
    updateRecord(req,res);
})
router.get('/editProfile/:id',(req,res)=>{
    DoctorInfo.findById(req.params.id,(err,doc)=>{
        if(!err)
            res.render('editProfile.ejs',{
                doctorInfo: doc
            })
    })
})
function insertRecord(req,res){
    var doctorInfo = new DoctorInfo({
        name:req.body.name,
        specialization:req.body.specialization,
        age:req.body.age,
        tel:req.body.tel,
        location:req.body.location,
        bio:req.body.bio,
        degree:req.body.degree,
        clg:req.body.clg,
        yr:req.body.yr
    })
    doctorInfo.save((err,doc)=>{
        if(!err)
            res.redirect('/doctorPage/profile/data');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("/profile", {
                    doctorInfo: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    })
}
function updateRecord(req,res){
    DoctorInfo.findOneAndUpdate({_id:req.body._id},req.body,{new: true},(err,doc)=>{
        if(!err)
            res.redirect('/doctor/profile/data');
        else
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("/editProfile", {
                    doctorInfo: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
    })
}
module.exports = router;