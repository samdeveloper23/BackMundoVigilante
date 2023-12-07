const getDB = require('../../db/getDB');
const { generateError } = require('../../services/errors');
const bcrypt = require('bcrypt');

const upDateUsersRegCodeFinallyQuery = async (recoverPassCode, newPass) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id FROM users WHERE recoverPassCode = ?`,
      [recoverPassCode]
    );

    if (users.length < 1) {
      generateError('Codigo de recuperación de contraseña invalido', 404);
    }

    const hashedPass = await bcrypt.hash(newPass, 10);

    const modifiedAt = new Date();

    await connection.query(
      'UPDATE users SET recoverPassCode = null, password = ?, modifiedAt = ? WHERE recoverPassCode = ?',
      [hashedPass, modifiedAt, recoverPassCode]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = upDateUsersRegCodeFinallyQuery;
