const Joi = require("joi");
const { ValidationError } = require("./helpers/errors");

module.exports = {
  addFieldsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .min(7)
        .max(17)
        .required(),
      favorite: Joi.boolean(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const [errorMessage] = error.details;
      throw new ValidationError(`${errorMessage.message}`);
    }
    next();
  },

  updateFieldsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string()
        .pattern(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
        )
        .min(7)
        .max(17),
      favorite: Joi.boolean(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const [errorMessage] = error.details;
      throw new ValidationError(`${errorMessage.message}`);
    }
    next();
  },

  updateFaforiteValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const [errorMessage] = error.details;
      throw new ValidationError(`${errorMessage.message}`);
    }
    next();
  },

  signUpValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      subscription: Joi.string().valid("starter", "pro", "business"),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      const [errorMessage] = error.details;
      throw new ValidationError(`${errorMessage.message}`);
    }
    next();
  },

  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      const [errorMessage] = error.details;
      throw new ValidationError(`${errorMessage.message}`);
    }
    next();
  },

  subscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string().valid("starter", "pro", "business").required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      const [errorMessage] = error.details;
      throw new ValidationError(`${errorMessage.message}`);
    }
    next();
  },
};
