const { generateError } = require('../../services/errors');
const upDateUsersPassQuery = require('../../models/usersQuery/upDateUsersPassQuery');
const validateSchema = require('../../services/validateSchema');
const editUserPassSchema = require('../../schemas/users/editUserPassSchema');

const editUsersPass = async (req, res, next) => {
    try {
        const { currentPass, newPass } = req.body;

        await upDateUsersPassQuery(currentPass, newPass, req.user.id);

        await validateSchema(editUserPassSchema, req.body);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = editUsersPass;
