const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require('config');

class UsersController {
  static async getAll(req, res) {
    const users = await User.find();
    return res.send(users);
  }
  static async getById(req, res) {
    const userId = req.params.id;
    const user = await User.findById(userId);
    return res.send(user);
  }
  static async update(req, res) {
    const { idUser, ...updatedUserData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(idUser, updatedUserData);
    return res.send(updatedUser);
  }
  static async removeById(req, res) {
    const userId = req.params.id;
    const removedUser = await User.findByIdAndRemove(userId);
    return res.send(removedUser);
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
        config.get('secret'),
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).send({ auth: true, token: token });
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

      const token = jwt.sign({ id: user._id },  config.get('secret'), {
        expiresIn: 86400,
      });
      return res.status(200).send({ auth: true, token: token });
    } catch (error) {
      return res
        .status(500)
        .send("Error during login.", error.message || error.name);
    }
  }
}

module.exports = UsersController;
