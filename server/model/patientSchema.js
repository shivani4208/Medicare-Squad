const mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'This field is required'
    },
    age:{
        type:Number,
        required:'This field is required'
    },
    relation:{
        type:String,
        required:'This field is required'
    },
    symptoms:{
        type:String,
        required:'This field is required'
    },
    recordType:String,
    gender:String,
    fname:{
        type:String,
         required:[true,"Uploaded file must have a name"]
    }
})

var Member = mongoose.model('member',memberSchema);
module.exports = Member;