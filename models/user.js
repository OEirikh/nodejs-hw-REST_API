const { User } = require("./userShema");
const { RegistrationConflictError } = require("../middlewares/helpers/errors");

const signup = async (email, password) => {
  if (await User.findOne({ email })) {
    throw new RegistrationConflictError(`Email ${email} in use`);
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};

module.exports = {
  signup,
  // login,
};
