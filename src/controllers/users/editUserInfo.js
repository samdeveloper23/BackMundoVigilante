const selectUsersByIdQuery = require('../../models/usersQuery/selectUserByIdQuery');
const updateUserInfoQuery = require('../../models/usersQuery/updateUserInfoQuery');
const { generateError } = require('../../services/errors');
const validateSchema = require('../../services/validateSchema');
const editPersonalInfoSchema = require('../../schemas/users/editPersonalInfoSchema');

const editUserInfo = async (req, res, next) => {
    try {
        const { personalInfo } = req.body;

        await validateSchema(editPersonalInfoSchema, req.body);

        const user = await selectUsersByIdQuery(req.user.id);

        await updateUserInfoQuery(personalInfo, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = editUserInfo;
