const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const { generateError } = require('./errors');

const savePhoto = async (img, width) => {
    try {
        const uploadsPath = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR
        );

        try {
            await fs.access(uploadsPath);
        } catch {
            await fs.mkdir(uploadsPath);
        }

        const sharpImg = sharp(img.data);

        sharpImg.resize(width);

        const imgName = `${uuid()}.jpg`;

        const imgPath = path.join(uploadsPath, imgName);

        await sharpImg.toFile(imgPath);

        return imgName;
    } catch (error) {
        console.error(error);
        generateError('Error al guardar la imagen en el servidor');
    }
};

module.exports = savePhoto;
