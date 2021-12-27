const mongoose = require('mongoose');

var doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'This field is required'
    },
    specialization:{
        type:String,
        required:'This field is required'
    },
    age:Number,
    tel:{
        type:Number
    },
    location:String,
    bio:String,
    degree:String,
    clg:String,
    yr:Number
})

var DoctorInfo = mongoose.model('doctorInfo',doctorSchema);
module.exports = DoctorInfo;