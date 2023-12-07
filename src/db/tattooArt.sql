CREATE DATABASE IF NOT EXISTS tattooArt;

DROP DATABASE IF EXISTS tattooArt;

USE tattooArt;

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    username VARCHAR(40) UNIQUE NOT NULL,
    role ENUM('Artista', 'Estudio') DEFAULT 'Artista',
    avatar VARCHAR(100),
    place VARCHAR(70),
    personalInfo VARCHAR(300),
    active BOOLEAN DEFAULT false,
    registrationCode VARCHAR(50),
    recoverPassCode VARCHAR(50),
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME
);

CREATE TABLE IF NOT EXISTS publications (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
    photoName VARCHAR(100) NOT NULL,
    place VARCHAR(100),
    type ENUM ('Normal', 'Colaboración', 'Alquiler', 'Empleo') DEFAULT 'Normal',
    description VARCHAR(200),
    userId INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS likes (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    publicationId INT UNSIGNED NOT NULL,
    userId INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME,
    FOREIGN KEY (publicationId) REFERENCES publications(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(200) NOT NULL,
    publicationId INT UNSIGNED NOT NULL,
    userId INT UNSIGNED NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (publicationId) REFERENCES publications(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);