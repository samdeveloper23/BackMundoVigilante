const getDB = require('../../db/getDB');
const { generateError } = require('../../services/errors');

const selectAllPublicationQuery = async (
    keyword = '',
    date = '',
    userId = 0
) => {
    let connection;

    try {
        connection = await getDB();

        date = date.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        const [results] = await connection.query(
            `
      SELECT
        P.id AS publicationId,
        P.title,
        P.place,
        P.type,
        P.description,
        U.username AS author,
        U.avatar AS authorAvatar,
        P.userId AS authorId,
        P.photoName,
        P.videoName,
        P.userId = ? AS owner,
        P.createdAt,
        COUNT(L.id) AS likes,
        BIT_OR(L.userId = ?) AS likedByMe,
        C.id AS commentId,
        C.text AS commentText,
        UC.username AS commenter,
        UC.avatar AS commenterAvatar
      FROM publications P
      INNER JOIN users U ON P.userId = U.id 
      LEFT JOIN likes L ON P.id = L.publicationId
      LEFT JOIN comments C ON P.id = C.publicationId
      LEFT JOIN users UC ON C.userId = UC.id
      WHERE P.title LIKE ? OR P.place LIKE ? OR P.description LIKE ? OR P.type LIKE ? OR U.username LIKE ?
      GROUP BY P.id, C.id
      ORDER BY P.createdAt ${date}
    `,
            [
                userId,
                userId,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
            ]
        );

        if (results.length < 1) {
            generateError('No hay resultados', 404);
        }

        const publications = [];
        const comments = [];

        results.forEach((row) => {
            const {
                publicationId,
                title,
                place,
                type,
                description,
                author,
                authorId,
                authorAvatar,
                photoName,
                videoName,
                owner,
                createdAt,
                likes,
                likedByMe,
                commentId,
                commentText,
                commenter,
                commenterAvatar,
            } = row;

            if (!publications.some((pub) => pub.id === publicationId)) {
                publications.push({
                    id: publicationId,
                    title,
                    place,
                    type,
                    description,
                    author,
                    authorId,
                    authorAvatar,
                    photoName,
                    videoName,
                    owner,
                    createdAt,
                    likes,
                    likedByMe,
                    comments: [],
                });
            }

            if (commentId) {
                publications
                    .find((pub) => pub.id === publicationId)
                    .comments.push({
                        id: commentId,
                        text: commentText,
                        commenter,
                        commenterAvatar,
                    });
            }
        });

        return publications;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllPublicationQuery;
