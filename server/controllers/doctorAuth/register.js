const User = require('../../model/docInfo');
const bcrypt = require('bcrypt');
const path = require('path');

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
    await newuser.save();
    delete newuser.password;
    // res.json({
    //   message: 'successfully added',
    //   newuser,
    // });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: 'Error' });
  }
  res.render('doctorLogin.ejs');

};

module.exports = {
  handleRegister,
};