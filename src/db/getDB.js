const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool;

const getDB = async () => {
    try {
        if (!pool) {
            const db = await mysql.createConnection({
                host: 'bkdus5j4s9ph1odfu8z9-mysql.services.clever-cloud.com',
                user: 'uozyltbxpvs87x8h',
                password: 't3XnJ3wu1qRf7XTytpzH',
                timezone: 'Z',
            });

            await db.query(`CREATE DATABASE IF NOT EXISTS bkdus5j4s9ph1odfu8z9`);
            await db.query(`USE bkdus5j4s9ph1odfu8z9`);

            pool = mysql.createPool({
                connectionLimit: 10,
                host: 'bkdus5j4s9ph1odfu8z9-mysql.services.clever-cloud.com',
                user: 'uozyltbxpvs87x8h',
                password: 't3XnJ3wu1qRf7XTytpzH',
                database: 'bkdus5j4s9ph1odfu8z9',
                timezone: 'Z',
            });
        }

        return await pool.getConnection();
    } catch (error) {
        console.error(error);
    }
};

module.exports = getDB;
