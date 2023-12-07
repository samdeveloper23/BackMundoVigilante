const selectUsersByIdQuery = require('../../models/usersQuery/selectUserByIdQuery');
const updateUserPlaceQuery = require('../../models/usersQuery/updateUserPlaceQuery');
const { generateError } = require('../../services/errors');
const validateSchema = require('../../services/validateSchema');
const editUserPlaceSchema = require('../../schemas/users/editUserPlaceSchema');

const editUserPlace = async (req, res, next) => {
    try {
        const { place } = req.body;

        await validateSchema(editUserPlaceSchema, req.body);

        if (!place) {
            generateError('Faltan campos', 400);
        }

        const user = await selectUsersByIdQuery(req.user.id);

        await updateUserPlaceQuery(place, req.user.id);

        res.status(200).json({
            status: 'ok',
            message: 'Lugar actualizado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = editUserPlace;
