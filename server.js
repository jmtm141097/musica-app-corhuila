// Importacion del servidor
const express = require('express');
// Importacion del motor de visualizacion
const hbs = require('hbs');
//importacion rutas
const routes = require('./routes/routes');
const path = require('path');
// Importacion del body parser
const bodyParser = require('body-parser');
// Cargador de imagenes
const fileUpload = require('express-fileupload');
// conexion a la base de datos.
require('./hbs/helpers/helpers');

const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

require('./models/artistas');
require('./models/grupos');
require('./models/letras');
require('./models/usuarios');

const db = require('./db/db');

db.sync()
    .then(() => console.log('Conexion exitosa a la BD'))
    .catch(err => console.log(err));

//Usar express
const app = express();

app.use(fileUpload({
    uriDecodeFileNames: true,
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Puerto por el cual correra nuestro servidor.
const port = process.env.PORT || 3000;

// Localizacion de nuestros directorios publicos
app.use(express.static('public'));

// Express utilizando HBS
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/parciales');

// Habilitamos la libreria body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'));

//invocar flash
app.use(flash());

//manejo de sesiones
app.use(cookieParser());

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

app.use((req, resp, next) => {
    resp.locals.mensajes = req.flash();
    resp.locals.usuarios = {...req.user } || null;
    next();
});

// Rutas.
app.use('/', routes());

// Levantamos el servidor
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});