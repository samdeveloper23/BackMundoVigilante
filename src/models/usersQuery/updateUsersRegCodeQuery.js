const getDB = require('../../db/getDB');
const { generateError } = require('../../services/errors');

const updateUsersRegCodeQuery = async (regCode) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT registrationCode FROM users WHERE registrationCode = ?`,
      [regCode]
    );

    if (users.length < 1) {
      generateError('Codigo de registro inválido', 404);
    }

    const modifiedAt = new Date();

    await connection.query(
      'UPDATE users SET registrationCode = null, active = true, modifiedAt = ? WHERE registrationCode = ?',
      [modifiedAt, regCode]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUsersRegCodeQuery;
