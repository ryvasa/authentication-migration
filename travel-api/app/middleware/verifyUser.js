const User = require("../models").User;

exports.checkUserEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      const response = {
        status_response: false,
        message: `Email already in use`,
        data: null,
        errors: "Duplicate Data",
      };
      res.status(400).send(response);
      return;
    }
    next();
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

exports.checkUserId = async (req, res, next) => {
  try {
    let id;
    id = req.params.id || req.userId;
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
    next();
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
