require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { errorStandard, notFound } = require('./src/services/errors');
const userRoutes = require('./src/routes/userRoutes');
const publicationRoutes = require('./src/routes/publicationRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://mundovigilante.netlify.app', // URL del frontend.
        methods: ["GET", "POST"]
    }
});

app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());

// Configuración CORS
app.use(cors({
    origin: 'https://mundovigilante.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(process.env.UPLOADS_DIR || 'uploads')));

// MIDDLEWARE USERS
app.use(userRoutes);

// MIDDLEWARE PUBLICACIONES
app.use(publicationRoutes);

app.use(errorStandard);
app.use(notFound);

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`Usuario ${socket.id} se unió a la sala: ${data}`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data);
    });

    socket.on('disconnect', (data) => {
        console.log(`Usuario ${socket.id} desconectado`);
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Servidor HTTPS y Socket.IO escuchando en el puerto ${PORT}`);
});
