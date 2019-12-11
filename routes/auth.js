const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc   get loggedin user
// @access private
router.get('/', (req, res) => {
  res.send('Get Logged in User');
});

// @route   POST api/auth
// @desc   Auth user & get token
// @access public
router.post('/', (req, res) => {
  res.send('Login User');
});
module.exports = router;
