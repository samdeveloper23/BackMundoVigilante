const joi = require('joi');
const joiErrorMessages = require('../joiErrorMessages');

const editPersonalInfoSchema = joi.object({
    personalInfo: joi.string().max(150).messages(joiErrorMessages),
});

module.exports = editPersonalInfoSchema;
