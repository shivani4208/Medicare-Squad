const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

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
    city:String,
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    location:{
        type:{
            type:String,
            enum:['Point']
        },
        coordinates:{
            type:[Number],
            index:'2dsphere'
        },
        zipcode:Number,
    },
    bio:String,
    degree:String,
    clg:String,
    yr:Number,
    fname:{
        type:String,
        required:[true,'Upload File']
    }
})

doctorSchema.pre('save',async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type:'Point',
        coordinates:[loc[0].longitude,loc[0].latitude],
        zipcode:loc[0].zipcode
    }
    this.address = undefined;
    next();
})

var DoctorInfo = mongoose.model('doctorInfo',doctorSchema);
module.exports = DoctorInfo;