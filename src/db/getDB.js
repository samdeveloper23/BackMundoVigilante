const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT} = process.env;

let pool;

const getDB = async () => {
    try {
        if (!pool) {
            const db = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: 'Z',
                port: MYSQL_PORT,
            });

            db.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            db.query(`USE ${MYSQL_DB}`);

            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
                port: MYSQL_PORT,
            });
        }

        return await pool.getConnection();
    } catch (error) {
        console.error(error);
    }
};

module.exports = getDB;
