const joi = require('joi');

const joiErrorMessages = require('../joiErrorMessages');

const sendRecoverPassSchema = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(joiErrorMessages),
});

module.exports = sendRecoverPassSchema;
