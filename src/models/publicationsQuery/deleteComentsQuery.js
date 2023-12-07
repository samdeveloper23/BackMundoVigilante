const getDB = require('../../db/getDB');

const deleteCommentByIdQuery = async (commentId, publicationId) => {
  let connection;

  try {
    connection = await getDB();

    const [comment] = await connection.query(
      'SELECT * FROM comments WHERE publicationId = ? AND id = ?',
      [publicationId, commentId]
    );

    if (comment.length === 0) {
      throw new Error('El comentario no existe');
    }

    await connection.query(
      'DELETE FROM comments WHERE id = ? AND publicationId = ?',
      [commentId, publicationId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteCommentByIdQuery;
