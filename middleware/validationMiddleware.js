const Joi = require("joi");

const emailSchema = Joi.string().email().required();

const zipCodeSchema = Joi.number().integer().positive().required();

const idSchema = Joi.number().integer().positive().required();

function validateEmail(req, res, next) {
  const { error } = emailSchema.validate(req.body.email);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  next();
}

function validateZipCode(req, res, next) {
  const { error } = zipCodeSchema.validate(req.body.zipcode);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  next();
}

function validateId(req, res, next) {
  const { error } = idSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  next();
}

module.exports = {
  validateEmail,
  validateZipCode,
  validateId,
};
