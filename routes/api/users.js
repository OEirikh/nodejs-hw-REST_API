const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { asyncWrapper } = require("../../middlewares/helpers/apiHelpers");
const {
  signUpValidation,
  loginValidation,
  // subscriptionValidation,
} = require("../../middlewares/validation");

const {
  signupController,
  loginController,
  logoutController,
} = require("../../controllers/usersControllers");

router
  .post("/signup", signUpValidation, asyncWrapper(signupController))
  .post("/login", loginValidation, asyncWrapper(loginController))
  .get("/logout", authMiddleware, asyncWrapper(logoutController))
  .get("/current", authMiddleware, asyncWrapper(logoutController));

module.exports = { usersRouter: router };
