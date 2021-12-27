const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer=require('multer');
const DoctorInfo = require('../model/doctorSchema');

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
})

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "svg") {
        cb(null, true);
    } else {
        cb(new Error("File isn't accepted!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

router.get('/',(req,res)=>res.render('main.ejs'))
router.get('/profile',(req,res)=>{
    res.render('profile.ejs')
})
router.get('/editProfile',(req,res)=>{
    res.render('editProfile.ejs')
})
router.post('/profile',upload.single('myFile'),(req,res)=>{
    insertRecord(req,res);
})

function insertRecord(req,res){
    // console.log(req.file)
    try{
        var doctorInfo = new DoctorInfo({
            name:req.body.name,
            specialization:req.body.specialization,
            age:req.body.age,
            tel:req.body.tel,
            city:req.body.city,
            address:req.body.address,
            bio:req.body.bio,
            degree:req.body.degree,
            clg:req.body.clg,
            yr:req.body.yr,
            fname:req.file.filename
        })
        doctorInfo.save((err,doc)=>{
            if(!err)
                return res.redirect('/doctorPage');
        })
    } catch(err){
        console.log("Name of error: ",err)
    }
}

module.exports = router;