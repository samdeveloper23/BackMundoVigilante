require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const colors = require('colors');
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

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.resolve(process.env.UPLOADS_DIR || 'uploads')));

//MIDDLEWARE USERS
app.use(userRoutes);

//MIDDLEWARE PUBLICACIONES
app.use(publicationRoutes);

//******************//
app.use(errorStandard);

app.use(notFound);

app.listen(process.env.PORT, () => {
  console.log(`escuchado en el puerto: ${process.env.PORT}`.bgMagenta);
});
