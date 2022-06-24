const { signup, login } = require("../models/user");

const signupController = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await signup(email, password);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const loggedInUser = await login(email, password);

  res.status(201).json({
    status: "success",
    data: {
      token: loggedInUser.token,
      user: {
        email: loggedInUser.email,
        subscription: loggedInUser.subscription,
      },
    },
  });
};

module.exports = {
  signupController,
  loginController,
};
