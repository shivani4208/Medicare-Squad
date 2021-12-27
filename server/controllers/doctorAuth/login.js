const User = require('../../model/docInfo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleSignin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ success: false, message: 'invalid email' });

    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        delete user.password;
        return res.redirect('/doctorPage');
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