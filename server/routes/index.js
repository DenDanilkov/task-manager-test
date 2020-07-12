const express = require('express');
const router = express.Router();
const statusesRouter = require('./statuses');
const usersRouter = require('./users');
const authRouter = require('./auth');
const tasksRouter = require('./tasks');

router.use("/auth", authRouter);
router.use("/api/users", usersRouter);
router.use("/api/statuses", statusesRouter);
router.use("/api/tasks", tasksRouter);

module.exports = router;

