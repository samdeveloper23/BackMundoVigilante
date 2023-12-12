require('dotenv').config();
const https = require('https');
const fs = require('fs');
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
  origin: 'https://golden-palmier-bb8336.netlify.app',
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

const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/eva00.3utilities.com/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/eva00.3utilities.com/fullchain.pem', 'utf8'),
}, app);

httpsServer.listen(process.env.PORT || 443, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${process.env.PORT || 443}`.bgMagenta);
});

// Opcional: Redirección de HTTP a HTTPS
const http = require('http');
const httpsApp = express();

httpsApp.use((req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});

http.createServer(httpsApp).listen(80, () => {
  console.log('Servidor HTTP redirigiendo a HTTPS en el puerto 80');
});
