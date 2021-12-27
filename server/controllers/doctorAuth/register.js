const User = require('../../model/docInfo');
const bcrypt = require('bcrypt');
const path = require('path');

const handleRegister = async (req, res) => {
  console.log(req.body._id)
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.render('doctorSignUp.ejs',{msg:'This email is already taken.Please try to register with different email'});
    const hashed = await bcrypt.hash(req.body.password, 10);  
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
    });
    await newuser.save();
    delete newuser.password;
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: 'Error' });
  }
  res.render('doctorLogin.ejs',{msg:'',doctor:''});

};

module.exports = {
  handleRegister,
};