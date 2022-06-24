const jwt = require("jsonwebtoken");
// const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  try {
    // ?token
    // TODO: validate typeToken later!!!
    const [token] = req.headers.authorization.split(" ");
    // console.log(typeToken, token);
    if (!token) {
      next(new NotAuthorizedError("please provide  a token"));
    }
    // decode

    const user = jwt.decode(token, process.env.JWT_SECRET);
    // req.user
    req.token = token;
    req.user = user;
  } catch (error) {
    next(new NotAuthorizedError("invalid token"));
  }

  next();
};

// module.exports = {
//   authMiddleware,
// };
