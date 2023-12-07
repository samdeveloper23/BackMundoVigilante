const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../services/errors');

const upDateUsersPassQuery = async (currentPass, newPass, userId) => {
    let connection;

    try {
        connection = await getDB();

        const [users] = await connection.query(
            `SELECT password FROM users WHERE id = ?`,
            [userId]
        );

        const validPass = await bcrypt.compare(currentPass, users[0].password);

        if (!validPass) {
            generateError('Contraseña actual incorrecta', 401);
        }

        const hashedPass = await bcrypt.hash(newPass, 10);

        await connection.query(
            'UPDATE users SET password = ?, modifiedAt = ? WHERE id = ?',
            [hashedPass, new Date(), userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = upDateUsersPassQuery;
