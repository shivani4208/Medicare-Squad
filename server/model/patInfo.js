const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: { 
    type: String, 
    required:[true,'Please enter a name']
  },
  email: { 
    type: String, 
    required: [true,'Please enter an email'] 
  },
  password: { 
    type: String, 
    required: [true,'Please enter a password']
   }
});
module.exports = mongoose.model('patient', patientSchema);