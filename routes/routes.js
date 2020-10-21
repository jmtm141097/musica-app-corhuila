const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const artistasController = require('../controllers/ArtistasController');
const gruposController = require('../controllers/GruposController');
const homeController = require('../controllers/HomeController');
const letrasController = require('../controllers/LetrasController');

module.exports = function() {

    router.get('/', homeController.homePage);

    //Artistas.
    router.get('/artistas', artistasController.artistasPage);
    router.post('/nuevoArtista', [
        body('txtNombreArtista').not().isEmpty().trim().escape(),
        body('txtDescripcionArtista').not().isEmpty().trim().escape(),
        body('txtFechaNacimiento').isDate()
    ], artistasController.nuevoArtista);
    router.get('/artista/:url', artistasController.artistaPorUrl);
    router.get('/artista/editar/:id', artistasController.formularioEditarArtista);
    router.post('/editarArtista/:id', artistasController.editarArtista);
    router.delete('/artista/:url', artistasController.eliminarArtista);

    //Grupos.
    router.get('/grupos', gruposController.gruposPage);
    router.post('/nuevoGrupo', [
        body('txtNombreGrupo').not().isEmpty().trim().escape(),
        body('txtDescripcionGrupo').not().isEmpty().trim().escape(),
    ], gruposController.nuevoGrupo);
    router.get('/grupo/:url', gruposController.grupoPorUrl);
    router.get('/grupo/editar/:id', gruposController.formularioEditarGrupo);
    router.post('/editarGrupo/:id', gruposController.editarGrupo);
    router.delete('/grupo/:url', gruposController.eliminarGrupo);

    router.get('/top', homeController.topPage);
    router.get('/letras', letrasController.letrasPage);
    return router;

};