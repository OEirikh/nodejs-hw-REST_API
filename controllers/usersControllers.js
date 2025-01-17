const {
  signup,
  login,
  logout,
  updateAvatar,
  verifyEmail,
  resendingAEmailValidation,
} = require("../services/user");

const signupController = async (req, res) => {
  const { email, password } = req.body;

  const newUser = await signup(email, password);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        email: newUser.email,
        avatarURL: newUser.avatarURL,
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

const avatarController = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const avatarURL = await updateAvatar({ path: tempUpload, originalname }, _id);
  res.json({
    status: "success",
    code: 200,
    data: {
      avatarURL: avatarURL,
    },
  });
};

const verifyEmailController = async (req, res) => {
  const { verifyToken } = req.params;
  await verifyEmail(verifyToken);

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification successful",
    },
  });
};

const resendingAEmailValidationlController = async (req, res) => {
  const { email } = req.body;
  await resendingAEmailValidation(email);

  res.json({
    status: "success",
    code: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentController,
  avatarController,
  verifyEmailController,
  resendingAEmailValidationlController,
};
