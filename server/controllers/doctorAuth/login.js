const User = require('../../model/docInfo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleSignin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.render('doctorLogin.ejs',{msg:'Invalid Login Details',doctor:req.body});

    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        delete user.password;
        // console.log(req.body)
        console.log(user.id)
        return res.redirect('/doctorPage');
      }
      else{
        res.render('doctorLogin.ejs',{msg:"Invalid Login Details",doctor:req.body});
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