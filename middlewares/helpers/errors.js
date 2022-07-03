class ContactsAPIError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ContactsAPIError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametrsError extends ContactsAPIError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class RegistrationConflictError extends ContactsAPIError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class UnauthorizedError extends ContactsAPIError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class NotFoundError extends ContactsAPIError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class SendingEmailError extends ContactsAPIError {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  ContactsAPIError,
  ValidationError,
  WrongParametrsError,
  RegistrationConflictError,
  UnauthorizedError,
  NotFoundError,
  SendingEmailError,
};
