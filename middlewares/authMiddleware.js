const jwt = require("jsonwebtoken");
const { User } = require("../models/userShema");
const { UnauthorizedError } = require("../middlewares/helpers/errors");
const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    const [typeToken, token] = req.headers.authorization.split(" ");

    if (!token) {
      throw new UnauthorizedError("Not authorized");
    }

    const { _id } = jwt.decode(token, SECRET_KEY);
    const user = await User.findById(_id);

    if (!user || user.token !== token) {
      throw new UnauthorizedError("Not authorized");
    }

    req.user = user;
  } catch (error) {
    next(new UnauthorizedError("invalid token"));
  }

  next();
};

module.exports = {
  authMiddleware,
};
