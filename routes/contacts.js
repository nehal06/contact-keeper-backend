const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc   get all user contacts
// @access Private
router.get('/get-all-user', (req, res) => {
  res.send('Get All user contacts');
});

// @route   POST api/contacts
// @desc   Add new contact
// @access Private
router.post('/add-contact', (req, res) => {
  res.send('Add Contact');
});

// @route   PUT api/contacts/:id
// @desc   Update contact
// @access Private
router.put('/update-contact/:id', (req, res) => {
  res.send('Update Contact');
});

// @route   DELETE api/contacts/:id
// @desc   Delete contact
// @access Private
router.delete('/delete-contact/:id', (req, res) => {
  res.send('Delete Contact');
});
module.exports = router;
