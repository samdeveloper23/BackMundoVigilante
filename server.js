require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const { errorStandard, notFound } = require('./src/services/errors');
const userRoutes = require('./src/routes/userRoutes');
const publicationRoutes = require('./src/routes/publicationRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());

// Configuración CORS
app.use(cors({
  origin: 'https://golden-palmier-bb8336.netlify.app', // modificado

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(process.env.UPLOADS_DIR || 'uploads')));

// MIDDLEWARE USERS
app.use(userRoutes);

// MIDDLEWARE PUBLICACIONES
app.use(publicationRoutes);

app.use(errorStandard);
app.use(notFound);

app.listen(process.env.PORT ?? 8080, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${process.env.PORT ?? 8080}`);
});


