const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../middlewares/helpers/apiHelpers");
const {
  signUpValidation,
  loginValidation,
  // subscriptionValidation,
} = require("../../middlewares/validation");
const {
  signupController,
  loginController,
} = require("../../controllers/usersControllers");

router
  .post("/signup", signUpValidation, asyncWrapper(signupController))
  .post("/login", loginValidation, asyncWrapper(loginController));

module.exports = { usersRouter: router };
