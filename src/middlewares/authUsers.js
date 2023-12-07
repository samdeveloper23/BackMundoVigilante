const jwt = require('jsonwebtoken');
const { generateError } = require('../services/errors');

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            generateError('Falta la cabecera de autenticación', 401);
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch {
            generateError('Regístrate para participar', 401);
        }

        req.user = tokenInfo;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authUser;
