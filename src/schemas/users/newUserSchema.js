const joi = require('joi');

const joiErrorMessages = require('../joiErrorMessages');

const newUserSchema = joi.object({
    username: joi.string().required().messages(joiErrorMessages),
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(joiErrorMessages),
    password: joi
        .string()
        .min(8)
        .max(30)
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    role: joi.string().valid('Vs', 'Empresa').required(),
});

module.exports = newUserSchema;
