const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { User } = require("../models/userShema");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { SECRET_KEY } = process.env;

const {
  RegistrationConflictError,
  UnauthorizedError,
  NotFoundError,
} = require("../middlewares/helpers/errors");

const signup = async (email, password) => {
  if (await User.findOne({ email })) {
    throw new RegistrationConflictError(`Email ${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  return newUser.save();
};

const login = async (email, password) => {
  const existingUser = await User.findOne({ email });

  if (!existingUser || !existingUser.comparePassword(password)) {
    throw new UnauthorizedError(`Email ${email} or password is wrong`);
  }

  const token = await jwt.sign({ _id: existingUser._id }, SECRET_KEY, {
    expiresIn: "1h",
  });

  await User.findByIdAndUpdate(existingUser._id, {
    token,
  });

  const loggedInUser = await User.findOne({ email });

  return loggedInUser;
};

const logout = async (_id) => {
  await User.findByIdAndUpdate(_id, { token: null });
};

const updateAvatar = async ({ path: tempUpload, originalname }, _id) => {
  const imageName = `${_id}_${originalname}`;

  const AVATAR_DIR = path.resolve("./public/avatars");
  try {
    const resultUpload = path.join(AVATAR_DIR, imageName);

    jimp.read(tempUpload, (err, img) => {
      if (err) throw err;
      img
        .contain(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
        )
        .write(tempUpload);
    });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    await fs.unlink(tempUpload);

    return avatarURL;
  } catch (error) {
    throw new UnauthorizedError(`Not authorized`, {
      message: error.message,
    });
  }
};

const verifyEmail = async (verifyToken) => {
  const existingUser = await User.findOne({ verifyToken });
  if (!existingUser) {
    throw new NotFoundError("User not found");
  }

  await User.findOneAndUpdate(existingUser._id, {
    verify: true,
    verificationToken: null,
  });
};

module.exports = {
  signup,
  login,
  logout,
  updateAvatar,
  verifyEmail,
};
