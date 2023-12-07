const getDB = require('../../db/getDB');

const updateUserInfoQuery = async (personalInfo, userId) => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `UPDATE users SET personalInfo = ?, modifiedAt = ? WHERE id = ?`,
            [personalInfo, new Date(), userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserInfoQuery;
