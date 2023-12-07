const insertComentsQuery = require('../../models/publicationsQuery/insertComentsQuery');
const selectPublicationtByIdQuery = require('../../models/publicationsQuery/selectPublicationByIdQuery');
const { generateError } = require('../../services/errors');
const validateSchema = require('../../services/validateSchema');
const newCommentSchema = require('../../schemas/publications/newCommentSchema');

const addComent = async (req, res, next) => {
    try {
        const { publicationId } = req.params;

        const { text } = req.body;

        await validateSchema(newCommentSchema, req.body);

        if (!text) {
            generateError('Faltan campos', 400);
        }

        await selectPublicationtByIdQuery(publicationId, req.user.id);

        const coment = await insertComentsQuery(
            text,
            publicationId,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                publicationId: +publicationId,
                coment,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = addComent;
