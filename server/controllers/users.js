const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
class UsersController {
  static async addAvatar(req, res) {
    try {
      const idUser = req.userInfo.id;
      let user = await User.findOneAndUpdate(
        { _id: idUser },
        { $set: { avatar: req.file.path } },
        {
          new: true,
        }
      );
      return res.send("Avatar is updated");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const users = await User.find({}, { password: 0 });
      return res.send(users);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async getById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId, { password: 0 });
      return res.send(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const idUser = req.userInfo.id;
      const user = await User.findById(idUser, { password: 0 });
      return res.send(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async update(req, res) {
    try {
      const idUser = req.userInfo.id;
      await User.findByIdAndUpdate(idUser, req.body, { new: true });
      return res.status(200).send("user is updated");
    } catch (error) {
      console.log(error.message);
    }
  }
  static async removeById(req, res) {
    try {
      const userId = req.params.id;
      await User.findByIdAndRemove(userId);
      return res.status(200).send("User is removed");
    } catch (error) {
      console.log(error.message);
    }
  }
  static async register(req, res) {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const newUserData = req.body;
      const newUser = await User.create({
        ...newUserData,
        password: hashedPassword,
      });
      const token = jwt.sign(
        { userId: newUser._id, surname: newUser.surname, name: newUser.name },
        config.get("secret"),
        {
          expiresIn: 86400,
        }
      );
      return res
        .status(200)
        .send({ auth: true, token: token, user: { ...newUser } });
    } catch (error) {
      return res
        .status(500)
        .send(
          "There was a problem registering the user",
          error.message || error.name
        );
    }
  }
  static async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).send("No user found.");

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });

      const token = jwt.sign({ id: user._id }, config.get("secret"), {
        expiresIn: 86400,
      });
      return res.status(200).send({ auth: true, token: token, user });
    } catch (error) {
      return res
        .status(500)
        .send("Error during login.", error.message || error.name);
    }
  }
}

module.exports = UsersController;
