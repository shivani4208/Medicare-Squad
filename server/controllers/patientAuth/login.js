const Register = require('../../model/patInfo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

const handleSignin = async (req, res) => {
  try {
    const user = await Register.findOne({ email: req.body.email });
    console.log(req.body.email);
    // res.status(400).json({ success: false, message: 'invalid email' });
    if (!user) return res.render('patientLogin.ejs');
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        delete user.password;
        return res.redirect('/patientPage');
      }
      else{
        res.send("invalid login details");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: 'Error' });
  }
};

module.exports = {
  handleSignin,
};