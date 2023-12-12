const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool;

const getDB = async () => {
    try {
        if (!pool) {
            const db = await mysql.createConnection({
                host: 'bfbhminj0t81fyod2xxt-mysql.services.clever-cloud.com',
                user: 'uozyltbxpvs87x8h',
                password: 't3XnJ3wu1qRf7XTytpzH',
                timezone: 'Z',
            });

            db.query(`CREATE DATABASE IF NOT EXISTS bfbhminj0t81fyod2xxt`);

            db.query(`USE bfbhminj0t81fyod2xxt`);

            pool = mysql.createPool({
                connectionLimit: 5,
                host: 'bfbhminj0t81fyod2xxt-mysql.services.clever-cloud.com',
                user: 'uozyltbxpvs87x8h',
                password: 't3XnJ3wu1qRf7XTytpzH',
                database: 'bfbhminj0t81fyod2xxt',
                timezone: 'Z',
            });
        }

        return await pool.getConnection();
    } catch (error) {
        console.error(error);
    }
};

module.exports = getDB;
