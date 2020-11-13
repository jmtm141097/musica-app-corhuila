const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const artistasController = require('../controllers/ArtistasController');
const gruposController = require('../controllers/GruposController');
const homeController = require('../controllers/HomeController');
const letrasController = require('../controllers/LetrasController');
const UsuariosController = require('../controllers/UsuariosController');

module.exports = function() {

    //Login
    router.get('/iniciar-sesion', UsuariosController.loginPage);
    router.get('/crear-cuenta', UsuariosController.formCrearCuenta);
    router.post('/crear-cuenta', UsuariosController.crearCuenta);

    router.get('/', homeController.homePage);
    router.get('/top', homeController.topPage);

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

    //letras.
    router.get('/letras', letrasController.letrasPage);
    router.patch('/letras/:id', letrasController.actualizarVisitas);
    router.post('/nuevaLetra', [
        body('txtNombreCancion').not().isEmpty().trim().escape(),
        body('txtDescripcionCancion').not().isEmpty().trim().escape(),
    ], letrasController.nuevaCancion);
    router.get('/letra/:url', letrasController.letraPorUrl);

    return router;

};