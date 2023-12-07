const fs = require('fs/promises');
const path = require('path');
const { generateError } = require('./errors');

const deletePhoto = async (imgName) => {
    try {
        const imgPath = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR,
            imgName
        );

        try {
            await fs.access(imgPath);
        } catch {
            return;
        }

        await fs.unlink(imgPath);
    } catch (error) {
        console.error(error);
        generateError('Error al eliminar la imagen del servidor', 500);
    }
};

module.exports = deletePhoto;
