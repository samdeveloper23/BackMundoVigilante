const selectUserByIdQuery = require('../../models/usersQuery/selectUserByIdQuery');
const updateUserAvatarQuery = require('../../models/usersQuery/updateUserAvatarQuery');
const { generateError } = require('../../services/errors');
const savePhoto = require('../../services/savePhoto');
const deletePhoto = require('../../services/deletePhoto');

const editUserAvatar = async (req, res, next) => {
    try {
        if (!req.files?.avatar) {
            generateError('Faltan campos', 400);
        }

        const user = await selectUserByIdQuery(req.user.id);

        if (user.avatar) {
            await deletePhoto(user.avatar);
        }
        const avatar = await savePhoto(req.files.avatar, 100);

        await updateUserAvatarQuery(avatar, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = editUserAvatar;
