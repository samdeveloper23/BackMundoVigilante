const getDB = require('../../db/getDB');
const { generateError } = require('../../services/errors');

const selectPublicationtByIdQuery = async (publicationId, userId = 0) => {
    let connection;

    try {
        connection = await getDB();

        const [publications] = await connection.query(
            `
            SELECT
            P.id AS publicationId,
            P.title,
            P.place,
            P.type,
            P.userId,
            P.description,
            U.username AS author,
            U.avatar AS authorAvatar, -- Nuevo campo para el avatar del autor
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
        WHERE P.id = ?
        GROUP BY P.id, C.id
      `,
            [userId, userId, publicationId]
        );

        if (publications.length < 1) {
            generateError('Publicación no encontrada', 404);
        }

        const publication = {
            id: publications[0].publicationId,
            title: publications[0].title,
            place: publications[0].place,
            type: publications[0].type,
            description: publications[0].description,
            author: publications[0].author,
            authorId: publications[0].authorId,
            photoName: publications[0].photoName,
            videoName: publications[0].videoName,
            owner: publications[0].owner,
            createdAt: publications[0].createdAt,
            likes: publications[0].likes,
            likedByMe: publications[0].likedByMe,
            authorAvatar: publications[0].authorAvatar,
            comments: [],
        };

        publications.forEach((row) => {
            if (row.commentId) {
                publication.comments.push({
                    id: row.commentId,
                    text: row.commentText,
                    commenter: row.commenter,
                    commenterAvatar: row.commenterAvatar,
                    owner: row.owner,
                    createdAt: row.createdAt,
                });
            }
        });

        return publication;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPublicationtByIdQuery;
