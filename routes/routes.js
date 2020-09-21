const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const musicaController = require('../controllers/MusicaController');

module.exports = function() {

    router.get('/', musicaController.homePage);
    router.get('/artistas', musicaController.artistasPage);
    router.post('/nuevoArtista', [
        body('txtNombreArtista').not().isEmpty().trim().escape(),
        body('txtDescripcionArtista').not().isEmpty().trim().escape(),
        body('txtFechaNacimiento').isDate()
    ], musicaController.nuevoArtista);
    router.get('/grupos', musicaController.gruposPage);
    router.get('/top', musicaController.topPage);
    router.get('/letras', musicaController.letrasPage);
    return router;

};