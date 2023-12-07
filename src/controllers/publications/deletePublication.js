const deletePublicationQuery = require('../../models/publicationsQuery/deletePublicationQuery');
const selectPublicationtByIdQuery = require('../../models/publicationsQuery/selectPublicationByIdQuery');
const { generateError } = require('../../services/errors');

const deletePublication = async (req, res, next) => {
    try {
        const { publicationId } = req.params;

        const publication = await selectPublicationtByIdQuery(publicationId);

        if (!publication) {
            generateError('Publicación no encontrada', 404);
        }

        if (publication.authorId !== req.user.id) {
            generateError(
                'No tienes permiso para eliminar esta publicación',
                403
            );
        }

        await deletePublicationQuery(publicationId);

        res.send({
            status: 'ok',
            message: 'Publicación eliminada exitosamente',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deletePublication;
