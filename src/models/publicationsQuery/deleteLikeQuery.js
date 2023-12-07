const getDB = require('../../db/getDB');

const { generateError } = require('../../services/errors');

const deleteLikeQuery = async (publicationId, userId) => {
  let connection;

  try {
    connection = await getDB();

    const [likes] = await connection.query(
      `SELECT id FROM likes WHERE publicationId = ? AND userId = ?`,
      [publicationId, userId]
    );

    if (likes.length < 1) {
      generateError('Aún no hay ningún like', 404);
    }

    await connection.query(
      `DELETE FROM likes WHERE publicationId = ? AND userId = ?`,
      [publicationId, userId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteLikeQuery;
