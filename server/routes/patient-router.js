const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Member = require('../model/patientSchema');
const DoctorInfo = require('../model/doctorSchema');
const { checkSignIn } = require('../controllers/patientAuth/register');

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
    if (file.mimetype.split("/")[1] === "pdf" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpeg") {
        cb(null, true);
    } else {
        cb(new Error("File isn't accepted!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})


router.get('/',checkSignIn,(req,res)=>{
    res.render('index.ejs');
  })
router.get('/bookAppoint',(req,res)=>{
    let location = req.query.location;
        let field = req.query.field;
        DoctorInfo.find({location,field},(err,doc)=>{
            if(!err)
                res.render('bookAppoint.ejs',{
                location:location,
                field:field,
                member:doc
            })
            else 
            console.log('Error in retrieving doctor list :' + err);
        })
})
router.get('/record',(req,res)=>{
    Member.find((err,doc)=>{
        if(!err) {
            res.render('record.ejs',{
                member: doc
            })
        } else{
            console.log('Error in retrieving employee list :' + err);
        }
    })
})

router.get('/record/addForm',async (req,res)=>{
    try{
        res.render('addForm.ejs',{member:req.body});
    } catch(err){
        console.log(err);
    }
})
router.post('/record/addForm',upload.single('myFile'),(req,res)=>{
    insertRecord(req,res);
})
router.post('/record/updateForm',upload.single('myFile'),(req,res)=>{
    updateRecord(req,res);
})
router.get("/record/uploads/:id", async (req, res) => {
    Member.findById(req.params.id,(err,files)=>{
        if(!err)
            res.render('uploads.ejs',{
                files: files
            })
    })
});
// router.post('/record/uploads/:id',(req,res)=>{
//     res.render('upload.ejs');
// })

const insertRecord = async (req,res)=>{
    try{
        var member = await new Member({
            name:req.body.name,
            symptoms:req.body.symptoms,
            age:req.body.age,
            gender:req.body.gender,
            relation:req.body.relation,
            recordType:req.body.recordType,
            fname:req.file.filename ,     
        })
        member.save((err,doc)=>{
            if(!err)
                return res.redirect('/patientPage/record');})
    } catch(err){
        if (err.name == 'ValidationError') {
            // console.log('ValidationError');
            handleValidationError(err, req.body);
            res.render("addForm.ejs", {
                member: req.body
            });
        } else if(err.name == 'TypeError'){
            // console.log('TypeError');
            let filename = '';
            res.render("addForm.ejs", {
                member: req.body
            });
        } else{
            console.log('Error during record insertion : ' + err);
        }
    }
}
  
const updateRecord = async (req,res)=>{
    try{
        Member.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
            if(!err){
                return res.redirect('/patientPage/record');
            }
        })
    } catch(err){
        if (err.name == 'ValidationError') {
            // console.log('ValidationError');
            handleValidationError(err, req.body);
            res.render("updateForm.ejs", {
                member: req.body,
            });
        }
        else
            console.log('Error during record update : ' + err);
    }
}
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'age':
                body['ageError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/record/:id',(req,res)=>{
    Member.findById(req.params.id,(err,doc)=>{
        if(!err)
            res.render('updateForm.ejs',{
                member: doc
            })
    })
})
router.get('/record/delete/:id', (req, res) => {
    Member.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/patientPage/record');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});



module.exports = router;