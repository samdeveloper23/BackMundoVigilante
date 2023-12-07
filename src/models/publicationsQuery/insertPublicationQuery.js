const getDB = require('../../db/getDB');

const insertPublicationQuery = async (
    title,
    photoName,
    videoName,
    place,
    type,
    description,
    userId
) => {
    let connection;

    try {
        connection = await getDB();

        const createdAt = new Date();

        const [publication] = await connection.query(
            `INSERT INTO publications(title, photoName, videoName, place, type, description, userId, createdAt) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                photoName,
                videoName,
                place,
                type,
                description,
                userId,
                createdAt,
            ]
        );

        return {
            id: publication.insertId,
            title,
            photoName,
            videoName,
            place,
            type,
            description,
            userId,
            createdAt,
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPublicationQuery;
