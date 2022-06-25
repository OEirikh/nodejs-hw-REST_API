const { signup, login, logout } = require("../servises/user");

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

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).json();
};

const currentController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
};
