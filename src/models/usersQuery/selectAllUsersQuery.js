const getDB = require('../../db/getDB');
const { generateError } = require('../../services/errors');

const selectAllUsersQuery = async (keyword = '') => {
    let connection;

    try {
        connection = await getDB();

        const [users] = await connection.query(
            `
          SELECT 
              id, 
              username, 
              email, 
              role, 
              avatar,
              place
          FROM users 
          WHERE userName LIKE ? OR role LIKE ? OR place LIKE ?
      `,
            [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
        );

        // Si no hay usuarios, lanzamos un error.
        if (users.length < 1) {
            generateError(
                'Todavía no hay usuarios. ¡Regístrate y sé el primero!',
                404
            );
        }

        return users;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllUsersQuery;
