const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = require("../models").User;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    const response = {
      status_response: true,
      message: users.length + " users data",
      data: users,
      errors: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "name", "email", "role"],
    });
    const response = {
      status_response: true,
      message: `User data with id ${id}`,
      data: user,
      errors: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.userId;
    console.log(req.body);
    if (id !== userId) {
      const response = {
        status_response: false,
        message: "User data can only be updated by that user",
        data: null,
        errors: "Error User Update",
      };
      res.status(401).send(response);
      return;
    }
    let { name, phoneNumber, email, password } = req.body;
    const user = await User.findOne({
      where: { id },
    });
    if (!user) {
      const response = {
        status_response: false,
        message: "User not found",
        data: null,
        errors: "Data Not Found",
      };
      res.status(404).send(response);
      return;
    }
    if (password) {
      password = bcrypt.hashSync(password, 8);
    } else {
      password = user.password;
    }
    user.set({
      name: name || user.name,
      phone_number: phoneNumber || user.phone_number,
      email: email || user.email,
      password,
    });
    await user.save();
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const response = {
      status_response: true,
      message: `User has been updated`,
      data: data,
      errors: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: { id },
    });
    const response = {
      status_response: true,
      message: `User data with id ${id} has been deleted`,
      data: user,
      errors: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};

exports.findMe = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "name", "email", "role"],
    });
    const response = {
      status_response: true,
      message: `User data with id ${id}`,
      data: user,
      errors: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};

exports.updateRole = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findOne({
      where: { id },
    });
    user.set({
      role: role || user.role,
    });
    await user.save();
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const response = {
      status_response: true,
      message: `Role user has been updated`,
      data: data,
      errors: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      data: null,
      errors: error.message,
    };
    res.status(500).send(response);
  }
};
