const { generateError } = require('../../services/errors');
const upDateUsersRegCodeFinallyQuery = require('../../models/usersQuery/upDateUsersRegCodeFinallyQuery');
const validateSchema = require('../../services/validateSchema');
const editUsersRecoverPassSchema = require('../../schemas/users/editUsersRecoverPassSchema');

const editUsersRecoverPass = async (req, res, next) => {
    try {
        const { recoverPassCode, newPass } = req.body;

        await validateSchema(editUsersRecoverPassSchema, req.body);

        await upDateUsersRegCodeFinallyQuery(recoverPassCode, newPass);

        res.send({
            status: 'ok',
            message: 'contraseña correctamente actualizada',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = editUsersRecoverPass;
