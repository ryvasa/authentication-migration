const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = require("../models").User;
const Op = db.Sequelize.Op;

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      role,
    });
    const response = {
      status_response: true,
      message: "User sign up",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      errors: null,
    };
    res.status(201).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: "Failed to sign up user",
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
    });
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      const response = {
        status_response: false,
        message: "Wrong Password!",
        data: null,
        errors: "Error",
      };
      res.status(401).send(response);
      return;
    }
    const response = {
      status_response: true,
      message: "User sign up",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      errors: null,
    };
    const token =
      "Bearer " +
      jwt.sign({ id: user.id, role: user.role }, process.env.SECRETE, {
        expiresIn: 86400,
      });
    res.status(200).send({ ...response, token });
  } catch (error) {
    const response = {
      status_response: false,
      message: "Failed to sign in user",
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};
