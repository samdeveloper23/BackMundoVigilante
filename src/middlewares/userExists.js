const getDB = require('../db/getDB');

const { generateError } = require('../services/errors');

const userExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [req.user.id]
        );

        if (users.length < 1) {
            generateError('Usuario no encontrado', 404);
        }

        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;
