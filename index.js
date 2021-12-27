const express = require('express');
const connectDB = require('./server/database/connection');
const patRouter = require('./server/routes/patient');
const docRouter = require('./server/routes/doctor');
const bodyParser = require('body-parser');
const path = require('path');
var http = require('http');  
const cors = require('cors');
require('dotenv').config();


var session = require('express-session');

const app = express();

const start = async () => {
  await connectDB();
  
  app.use(cors());
  
  app.use(express.json());
  app.use(express.urlencoded({extended:false}))
  
  app.set('view engine', 'ejs');
  app.set('views', [__dirname + '/views/homepage', __dirname + '/views/patientForm',__dirname + '/views/doctorForm',__dirname + '/views/patient',__dirname + '/views/doctor']);
  
  app.use('/patient', patRouter);
  app.use('/doctor', docRouter);
  app.use('/file',express.static('public'));
  
  app.use(express.static(__dirname+'/public'))
  
  app.use('/patientPage',require('./server/routes/patient-router'));
  app.use('/doctorPage',require('./server/routes/doctor-router'));
  app.use(session({
    secret: 'priyajain',
    resave: true,
    saveUninitialized:true,
  }));
  
  app.get('/', (req, res) => {
    res.render('home.ejs');
  });
  app.listen(process.env.PORT||3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

start();