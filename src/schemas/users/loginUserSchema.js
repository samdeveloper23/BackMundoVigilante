const joi = require('joi');

const joiErrorMessages = require('../joiErrorMessages');

const loginUserSchema = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(joiErrorMessages),
    password: joi.string().min(8).max(30).required().messages(joiErrorMessages),
});

module.exports = loginUserSchema;
