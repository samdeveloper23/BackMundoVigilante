const deleteLikeQuery = require('../../models/publicationsQuery/deleteLikeQuery');

const deleteLike = async (req, res, next) => {
    try {
        const { publicationId } = req.params;

        await deleteLikeQuery(publicationId, req.user.id);

        res.send({
            status: 'ok',
            message: 'Like eliminado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteLike;
