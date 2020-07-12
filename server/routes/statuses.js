const express = require('express');
const StatusesController = require('../controllers/statuses')

  const router = express.Router();
  router
    .route('/')
    .get(StatusesController.getAll)
    .post(StatusesController.create)
    .put(StatusesController.update);
  router.route('/:id').get(StatusesController.getById);
  router.route('/:id').delete(StatusesController.removeById);

  module.exports = router
