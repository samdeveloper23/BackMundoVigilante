require('dotenv').config();

const getDB = require('./getDB');

const main = async () => {
    let connection;

    try {
        connection = await getDB();

        console.log('Borrando tablas...');

        await connection.query('DROP TABLE IF EXISTS comments');
        await connection.query('DROP TABLE IF EXISTS likes');
        await connection.query('DROP TABLE IF EXISTS publications');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                username VARCHAR(100) UNIQUE NOT NULL,
                role ENUM('Vs', 'Empresa') DEFAULT 'Vs',
                avatar VARCHAR(100),
                place VARCHAR (70),
                personalInfo VARCHAR(300),
                active BOOLEAN DEFAULT false,
                registrationCode VARCHAR(50),
                recoverPassCode VARCHAR(50),
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS publications (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                photoName VARCHAR(100),
                videoName VARCHAR(100),
                place VARCHAR(100),
                type ENUM ( 'Normal', 'Colaboración', 'Alquiler', 'Empleo') DEFAULT 'Normal',
                description VARCHAR(200),
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            )    
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                publicationId INT UNSIGNED NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME,
                FOREIGN KEY (publicationId) REFERENCES publications(id),
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                text VARCHAR(200) NOT NULL,
                publicationId INT UNSIGNED NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME NOT NULL,
                FOREIGN KEY (publicationId) REFERENCES publications(id),
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        console.log('¡Tablas creadas!');
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};

main();
