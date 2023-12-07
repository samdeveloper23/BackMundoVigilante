const joi = require('joi');

const joiErrorMessages = require('../joiErrorMessages');

const editUserPassSchema = joi.object({
    currentPass: joi
        .string()
        .min(8)
        .max(30)
        .required()
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .messages(joiErrorMessages),
    newPass: joi
        .string()
        .min(8)
        .max(30)
        .required()
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .messages(joiErrorMessages),
});

module.exports = editUserPassSchema;
