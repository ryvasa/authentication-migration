exports.verifyDataSignUp = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    const response = {
      status_response: false,
      message: "Please enter data name, email, password and role",
      data: null,
      errors: "Inclomplete Data",
    };
    res.status(400).send(response);
    return;
  } else {
    next();
  }
};
exports.verifyDataSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const response = {
      status_response: false,
      message: "Please enter data email and password",
      data: null,
      errors: "Inclomplete Data",
    };
    res.status(400).send(response);
    return;
  } else {
    next();
  }
};
