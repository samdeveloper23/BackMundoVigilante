const getDB = require('../../db/getDB');

const { generateError } = require('../../services/errors');

const insertLikeQuery = async (publicationId, userId) => {
  let connection;

  try {
    connection = await getDB();

    const [likes] = await connection.query(
      `SELECT id FROM likes WHERE publicationId = ? AND userId = ?`,
      [publicationId, userId]
    );

    if (likes.length > 0) {
      generateError('No puedes dar like dos veces a la misma publicación', 403);
    }

    await connection.query(
      `INSERT INTO likes(publicationId, userId, createdAt) VALUES(?, ?, ?)`,
      [publicationId, userId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertLikeQuery;
