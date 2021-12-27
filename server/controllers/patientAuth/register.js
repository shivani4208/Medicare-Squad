const User = require('../../model/patInfo');
const bcrypt = require('bcrypt');
const path = require('path');

// var multer = require('multer');
// var upload = multer(); 
// var cookieParser = require('cookie-parser');


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(upload.array());
// app.use(cookieParser());

// var Users = [];

const handleRegister = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('already exists');
    const hashed = await bcrypt.hash(req.body.password, 10);  
    const newuser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });
    req.session.user = newuser;
    await newuser.save();
    delete newuser.password;
    } catch (err) {
      console.log(err);
      res.status(501).json({ message: 'Error' });
    }
    
    res.render('patientLogin.ejs');
};

module.exports = {
  handleRegister,
  checkSignIn(req, res)
  {
    if(req.session.user){
       next();     //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  //Error, trying to access unauthorized page!
    }
 }
};