const getDB = require('../../db/getDB');

const insertComent = async (text, publicationId, userId) => {
  let connection;

  try {
    connection = await getDB();

    const [comemnt] = await connection.query(
      `INSERT INTO comments(text, publicationId, userId, createdAt) VALUES(?, ?, ?, ?)`,
      [text, publicationId, userId, new Date()]
    );

    return {
      id: comemnt.insertId,
      text,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertComent;
