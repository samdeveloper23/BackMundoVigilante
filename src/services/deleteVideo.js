const fs = require('fs/promises');
const path = require('path');
const { generateError } = require('./errors');

const deleteVideo = async (videoName) => {
    try {
        const uploadsPath = path.join(__dirname, '..', '..', process.env.UPLOADS_DIR);
        const videoPath = path.join(uploadsPath, videoName);

        // Verificar si el video existe antes de eliminarlo
        try {
            await fs.access(videoPath);
        } catch {
            generateError('El video no existe', 404);
        }

        // Eliminar el video
        await fs.unlink(videoPath);

        return true; // Devolver true para indicar que el video fue eliminado exitosamente
    } catch (error) {
        console.error(error);
        generateError('Error al eliminar el video en el servidor');
    }
};

module.exports = deleteVideo;
