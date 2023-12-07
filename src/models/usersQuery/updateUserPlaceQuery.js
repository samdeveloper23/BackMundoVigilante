const getDB = require('../../db/getDB');

const updateUserPlaceQuery = async (place, userId) => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `UPDATE users SET place = ?, modifiedAt = ? WHERE id = ? `,
            [place, new Date(), userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserPlaceQuery;
