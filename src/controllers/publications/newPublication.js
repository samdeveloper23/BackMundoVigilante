const { generateError } = require('../../services/errors');
const savePhoto = require('../../services/savePhoto');
const saveVideo = require('../../services/saveVideo');
const insertPublicationQuery = require('../../models/publicationsQuery/insertPublicationQuery');
const validateSchema = require('../../services/validateSchema');
const newPublicationSchema = require('../../schemas/publications/newPublicationSchema');

const newPublication = async (req, res, next) => {
    try {
        const { title, place, type, description } = req.body;
        let photoName;
        let videoName;

        if (!title || !description) {
            generateError('Faltan campos', 400);
        }

        if (
            !req.files ||
            (req.files.photo && req.files.video) ||
            (!req.files.photo && !req.files.video)
        ) {
            generateError(
                'Debes seleccionar una imagen o un video, pero no ambos o ninguno',
                400
            );
        }

        if (req.files.photo) {
            photoName = await savePhoto(req.files.photo, 500);
        }

        if (req.files.video) {
            videoName = await saveVideo(req.files.video, 50 * 1024 * 1024);
        }

        const publication = await insertPublicationQuery(
            title,
            photoName,
            videoName,
            place,
            type,
            description,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                publication,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newPublication;
