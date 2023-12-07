const getDB = require('../../db/getDB');

const bcrypt = require('bcrypt');

const { generateError } = require('../../services/errors');

const insertUserQuery = async (
    email,
    username,
    password,
    role,
    registrationCode
) => {
    let connection;

    try {
        connection = await getDB();

        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            generateError('Ya existe un usuario con ese email', 403);
        }

        [users] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        if (users.length > 0) {
            generateError('Nombre de usuario no disponible', 403);
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await connection.query(
            `INSERT INTO users (role, email, username, password, createdAt, registrationCode) VALUES(?, ?, ?, ?, ?, ?)`,
            [role, email, username, hashedPass, new Date(), registrationCode]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
