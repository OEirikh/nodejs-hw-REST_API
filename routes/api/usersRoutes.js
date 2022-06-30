const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { uploadMiddleware } = require("../../middlewares/uploadMiddleware");

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
  currentController,
  avatarController,
} = require("../../controllers/usersControllers");

router
  .post("/signup", signUpValidation, asyncWrapper(signupController))
  .get("/verify/:verificationToken", asyncWrapper())
  .post("/login", loginValidation, asyncWrapper(loginController))
  .get("/logout", authMiddleware, asyncWrapper(logoutController))
  .get("/current", authMiddleware, asyncWrapper(currentController))
  .patch(
    "/avatars",
    authMiddleware,
    uploadMiddleware.single("avatar"),
    asyncWrapper(avatarController)
  );

module.exports = { usersRouter: router };
