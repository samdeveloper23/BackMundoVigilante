const deleteCommentByIdQuery = require('../../models/publicationsQuery/deleteComentsQuery');
const selectPublicationtByIdQuery = require('../../models/publicationsQuery/selectPublicationByIdQuery');
const { generateError } = require('../../services/errors');

const deleteComments = async (req, res, next) => {
    try {
        const { publicationId, commentId } = req.params;

        const publication = await selectPublicationtByIdQuery(publicationId);

        if (!publication) {
            generateError('Publicación no encontrada', 404);
        }

        if (publication.authorId !== req.user.id) {
            generateError(
                'No tienes permiso para eliminar este comentario',
                403
            );
        }

        await deleteCommentByIdQuery(commentId, publicationId);

        res.send({
            status: 'ok',
            message: 'Comentario eliminado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteComments;
