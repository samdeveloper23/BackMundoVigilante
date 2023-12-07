const jwt = require('jsonwebtoken');

const { generateError } = require('../services/errors');

const authUserOptional = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (authorization && authorization !== 'null') {
            let userInfo;

            try {
                userInfo = jwt.verify(authorization, process.env.SECRET);
            } catch {
                generateError('Token incorrecto', 401);
            }

            req.user = userInfo;
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authUserOptional;
