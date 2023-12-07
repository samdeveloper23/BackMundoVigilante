const getDB = require('../../db/getDB');

const updateUserEmailToDeletedQuery = async (userId) => {
  let connection;
  try {
    connection = await getDB();

    await connection.query('DELETE FROM comments WHERE userId = ?', [userId]);

    await connection.query('DELETE FROM likes WHERE userId = ?', [userId]);

    await connection.query('DELETE FROM publications WHERE userId = ?', [
      userId,
    ]);

    await connection.query('DELETE FROM users WHERE id = ?', [userId]);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = updateUserEmailToDeletedQuery;
