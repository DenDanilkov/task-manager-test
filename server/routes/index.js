const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post('/', async (req, res, next) => {
  try {
    const user =  await User.create({
      ...req.body
    })
    res.send(user);
  } catch (error) {
    console.log(error)
  }
  
});

module.exports = router;
