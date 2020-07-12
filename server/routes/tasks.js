const express = require("express");
const TasksController = require("../controllers/tasks");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
router
  .route("/")
  .get(authMiddleware, TasksController.getAll)
  .put(authMiddleware, TasksController.update)
  .post(authMiddleware, TasksController.create);
router.route("/:id").get(authMiddleware, TasksController.getById);
router.route("/:id").delete(authMiddleware, TasksController.removeById);
router.route("/status").delete(authMiddleware, TasksController.getByCriteria);

module.exports = router;
