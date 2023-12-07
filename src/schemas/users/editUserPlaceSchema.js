const joi = require('joi');
const joiErrorMessages = require('../joiErrorMessages');

const editUserPlaceSchema = joi.object({
    place: joi.string().max(25).messages(joiErrorMessages),
});

module.exports = editUserPlaceSchema;
