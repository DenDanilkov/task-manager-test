const express = require('express');
const UsersController = require('../controllers/users')

  const router = express.Router();
  router.route('/login').get(UsersController.login);
  router.route('/register').post(UsersController.register);

  module.exports = router