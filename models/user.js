const { User } = require("./userShema");
const { RegistrationConflictError } = require("../middlewares/helpers/errors");

const signup = async (email, password) => {
  const user = await User.findOne({ email });

  console.log(user);

  if (user) {
    throw new RegistrationConflictError(`Email ${email} in use`);
  }

  const newUser = new User({ email });
  console.log(user);
  newUser.setPassword(password);
  newUser.save();
};

module.exports = {
  signup,
  // login,
};
