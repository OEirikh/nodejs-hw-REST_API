const { ContactsAPIError } = require("./errors");

const asyncWrapper = (ctrl) => {
  return (req, res, next) => {
    ctrl(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof ContactsAPIError) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
