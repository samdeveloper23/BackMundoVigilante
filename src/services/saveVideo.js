const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');
const { generateError } = require('./errors');

const saveVideo = async (video, maxSize) => {
    try {
        const uploadsPath = path.join(__dirname, '..', '..', process.env.UPLOADS_DIR);

        try {
            await fs.access(uploadsPath);
        } catch {
            await fs.mkdir(uploadsPath);
        }

        // Verificar el tamaño del video
        if (video.size > maxSize) {
            generateError('El tamaño del video supera el límite permitido', 400);
        }

        const videoName = `${uuid()}.mp4`;
        const videoPath = path.join(uploadsPath, videoName);

        await video.mv(videoPath);

        return videoName;
    } catch (error) {
        console.error(error);
        generateError('Error al guardar el video en el servidor');
    }
};

module.exports = saveVideo;
