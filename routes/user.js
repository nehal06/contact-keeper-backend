const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST api/user
// @desc    Register User
// @access Public
router.post(
  '/register',
  [
    check('name', 'Please provide name.')
      .not()
      .isEmpty(),
    check('email', 'Please provide valid email.').isEmail(),
    check('password', 'Please provide password of min 6 character').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // res.send('User saved');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
    // res.send('passed');
  }
);

module.exports = router;
