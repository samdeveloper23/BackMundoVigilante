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
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(process.env.UPLOADS_DIR || 'uploads')));

// MIDDLEWARE USERS
app.use(userRoutes);

// MIDDLEWARE PUBLICACIONES
app.use(publicationRoutes);

//******************//

const privateKey = fs.readFileSync('/etc/letsencrypt/live/eva00.3utilities.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/eva00.3utilities.com/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.httpsS_PORT || 443, () => {
  console.log(`Servidor httpsS escuchando en el puerto ${process.env.httpsS_PORT || 443}`.bgMagenta);
});

//******************//

app.use(errorStandard);
app.use(notFound);

// https server (optional, to redirect https to httpsS)
const https = require('https');
const httpsApp = express();

httpsApp.use((req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});

const httpsServer = https.createServer(httpsApp);

httpsServer.listen(process.env.https_PORT || 80, () => {
  console.log(`Servidor https redirigiendo a httpsS en el puerto ${process.env.https_PORT || 80}`.bgMagenta);
});
