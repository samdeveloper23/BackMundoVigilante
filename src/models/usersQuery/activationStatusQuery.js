const getDB = require('../../db/getDB');

const activationStatusQuery = async (email) => {
    let connection;

    try {
        connection = await getDB();

        const [user] = await connection.query(
            `SELECT active FROM users WHERE email = ?`,
            [email]
        );

        if (user.length === 0) {
            throw new Error(
                'El usuario no existe o el email no está registrado.'
            );
        }
        const activeStatus = user[0].active;

        if (activeStatus) {
            console.log('El usuario está activado.');
        } else {
            console.error('El usuario no está activado.');
        }

        return activeStatus;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = activationStatusQuery;
