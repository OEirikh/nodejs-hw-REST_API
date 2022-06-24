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

module.exports = {
  ContactsAPIError,
  ValidationError,
  WrongParametrsError,
  RegistrationConflictError,
};