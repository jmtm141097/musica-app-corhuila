// Importacion y despliegue del servidor
const express = require('express');
// Importacion del motor de visualizacion
const hbs = require('hbs');
const routes = require('./routes/routes');
const path = require('path');
// Importacion del body parser
const bodyParser = require('body-parser');
// conexion a la base de datos.
const db = require('./db/db');

require('./hbs/helpers/helpers');

db.sync()
    .then(() => console.log('Conexion exitosa a la BD'))
    .catch(err => console.log(err));

const app = express();

// Puerto por el cual correra nuestro servidor.
const port = process.env.PORT || 3000;

// Localizacion de nuestros directorios publicos
app.use(express.static(__dirname + '/public'));

// Express utilizando HBS
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, './views'));

// Habilitamos la libreria body parser

app.use(bodyParser.urlencoded({ extended: true }));

// Rutas.
app.use('/', routes());

// Levantamos el servidor
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});