const jwt = require("jsonwebtoken");
const { User } = require("./userShema");
const { SECRET_KEY } = process.env;

const {
  RegistrationConflictError,
  UnauthorizedError,
} = require("../middlewares/helpers/errors");

const signup = async (email, password) => {
  if (await User.findOne({ email })) {
    throw new RegistrationConflictError(`Email ${email} in use`);
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};

const login = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser || !existingUser.comparePassword(password)) {
    throw new UnauthorizedError(`Email ${email} or password is wrong`);
  }

  const token = await jwt.sign({ _id: existingUser._id }, SECRET_KEY);

  return await User.findByIdAndUpdate(existingUser._id, { token });
};

module.exports = {
  signup,
  login,
};
