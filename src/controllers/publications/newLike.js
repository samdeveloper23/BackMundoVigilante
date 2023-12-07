const insertLikeQuery = require('../../models/publicationsQuery/insertLikeQuery');

const newLike = async (req, res, next) => {
    try {
        const { publicationId } = req.params;

        await insertLikeQuery(publicationId, req.user.id);

        res.send({
            status: 'ok',
            message: 'Like agregado',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newLike;
