const selectUserByIdQuery = require('../../models/usersQuery/selectUserByIdQuery');
const deleteUserByIdQuery = require('../../models/usersQuery/deleteUserByIdQuery');
const { generateError } = require('../../services/errors');

const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { id: requesterId } = +req.user;

        const user = await selectUserByIdQuery(userId);

        if (!user) {
            generateError('Usuario no encontrado', 404);
        }

        if (user.id !== requesterId) {
            generateError('No tienes permiso para eliminar este usuario', 403);
        }

        await deleteUserByIdQuery(userId);

        res.send({
            status: 'ok',
            message: 'Usuario eliminado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteUser;
