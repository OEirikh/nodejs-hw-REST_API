const {
  signup,
  // login
} = require("../models/user");

const signupController = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await signup(email, password);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

module.exports = {
  signupController,
  // loginController,
};
