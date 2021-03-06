const express = require("express");

const UsersController = require("../controllers/users");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
router
  .route("/")
  .get(authMiddleware, UsersController.getAll)
  .put(authMiddleware, UsersController.update);
router.route("/current").get(authMiddleware, UsersController.getCurrentUser);
router.route("/avatar").post(authMiddleware, UsersController.addAvatar);
router.route("/:id").get(authMiddleware, UsersController.getById);
router.route("/:id").delete(authMiddleware, UsersController.removeById);

module.exports = router;
