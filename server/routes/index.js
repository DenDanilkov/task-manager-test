const express = require('express');
const router = express.Router();
const statusesRouter = require('./statuses');
const usersRouter = require('./users');
const authRouter = require('./auth');

router.use('/auth', authRouter)
router.use("/api/users", usersRouter);
router.use("/api/statuses", statusesRouter);
// router.use("/api/tasks", people(app, controllers));

module.exports = router;

