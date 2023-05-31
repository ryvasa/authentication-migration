const bcrypt = require("bcryptjs");
const User = require("../models").User;

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    const response = {
      status_response: true,
      message: users.length + " users data",
      errors: null,
      data: users,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
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
      errors: null,
      data: user,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
    };
    res.status(500).send(response);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.userId;
    if (id !== userId) {
      const response = {
        status_response: false,
        message: "User data can only be updated by that user",
        errors: "Error User Update",
        data: null,
      };
      res.status(401).send(response);
      return;
    }
    let { name, phoneNumber, email, password, role } = req.body;
    const user = await User.findOne({
      where: { id },
    });
    if (!user) {
      const response = {
        status_response: false,
        message: "User not found",
        errors: "Data Not Found",
        data: null,
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
      role: role || user.role,
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
      errors: null,
      data: data,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
    };
    res.status(500).send(response);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: { id },
    });
    const response = {
      status_response: true,
      message: `User data with id ${id} has been deleted`,
      errors: null,
      data: null,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
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
      errors: null,
      data: user,
    };
    res.status(200).send(response);
  } catch (error) {
    const response = {
      status_response: false,
      message: error.message,
      errors: error.message,
      data: null,
    };
    res.status(500).send(response);
  }
};
