const jwt = require("jsonwebtoken");
const User = require("../models/index.js").User;
const Role = require("../models/index.js").Role;

exports.verifyToken = (req, res, next) => {
  const tokenHeader = req.headers["x-access-token"];

  if (!tokenHeader || tokenHeader.split(" ")[0] !== "Bearer") {
    const response = {
      status_response: false,
      message: "Invalid token format",
      errors: "Error",
      data: null,
    };
    res.status(500).send(response);
    return;
  }

  const token = tokenHeader.split(" ")[1];
  if (!token) {
    const response = {
      status_response: false,
      message: "No token provided",
      errors: "Error",
      data: null,
    };
    res.status(403).send(response);
    return;
  }
  jwt.verify(token, process.env.SECRETE, (error, decoded) => {
    if (error) {
      const response = {
        status_response: false,
        message: "Token not valid",
        errors: error.message,
        data: null,
      };
      res.status(500).send(response);
      return;
    }
    req.userRole = decoded.role;
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  const role = req.userRole;
  const id = req.userId;
  const user = await User.findOne({ where: id, include: Role });
  // 3 disini sebagi ADMIN
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
  if ((user.Role.id !== 3 && role !== 3) || user.Role.name !== "ADMIN") {
    const response = {
      status_response: false,
      message: "Only admin can access",
      errors: "Error",
      data: null,
    };
    res.status(403).send(response);
    return;
  }
  next();
};
