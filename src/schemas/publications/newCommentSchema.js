const joi = require('joi');
const joiErrorMessages = require('../joiErrorMessages');

const newCommentSchema = joi.object({
    text: joi.string().max(50).messages(joiErrorMessages),
});

module.exports = newCommentSchema;
