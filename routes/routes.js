const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const artistasController = require('../controllers/ArtistasController');
const AuthController = require('../controllers/AuthController');
const gruposController = require('../controllers/GruposController');
const homeController = require('../controllers/HomeController');
const letrasController = require('../controllers/LetrasController');
const UsuariosController = require('../controllers/UsuariosController');

module.exports = function() {

    //Crear cuenta.
    router.get('/crear-cuenta', UsuariosController.formCrearCuenta);
    router.post('/crear-cuenta', UsuariosController.crearCuenta);

    //Iniciar sesion.
    router.get('/iniciar-sesion', UsuariosController.loginPage);
    router.post('/iniciar-sesion', AuthController.autenticarUsuario);

    //Cerrar sesion
    router.get('/cerrar-sesion', AuthController.cerrarSesion);

    //Restablecer password
    router.get('/restablecer', UsuariosController.formRestablecerPassword);
    router.post('/restablecer', AuthController.enviarToken);
    router.get('/restablecer', AuthController.resetPassword);

    router.get('/', AuthController.usuarioAutenticado, homeController.homePage);
    router.get('/top', AuthController.usuarioAutenticado, homeController.topPage);

    //Artistas.
    router.get('/artistas', AuthController.usuarioAutenticado, artistasController.artistasPage);
    router.post('/nuevoArtista', AuthController.usuarioAutenticado, [
        body('txtNombreArtista').not().isEmpty().trim().escape(),
        body('txtDescripcionArtista').not().isEmpty().trim().escape(),
        body('txtFechaNacimiento').isDate()
    ], artistasController.nuevoArtista);
    router.get('/artista/:url', AuthController.usuarioAutenticado, artistasController.artistaPorUrl);
    router.get('/artista/editar/:id', AuthController.usuarioAutenticado, artistasController.formularioEditarArtista);
    router.post('/editarArtista/:id', AuthController.usuarioAutenticado, artistasController.editarArtista);
    router.delete('/artista/:url', AuthController.usuarioAutenticado, artistasController.eliminarArtista);

    //Grupos.
    router.get('/grupos', AuthController.usuarioAutenticado, gruposController.gruposPage);
    router.post('/nuevoGrupo', AuthController.usuarioAutenticado, [
        body('txtNombreGrupo').not().isEmpty().trim().escape(),
        body('txtDescripcionGrupo').not().isEmpty().trim().escape(),
    ], gruposController.nuevoGrupo);
    router.get('/grupo/:url', AuthController.usuarioAutenticado, gruposController.grupoPorUrl);
    router.get('/grupo/editar/:id', AuthController.usuarioAutenticado, gruposController.formularioEditarGrupo);
    router.post('/editarGrupo/:id', AuthController.usuarioAutenticado, gruposController.editarGrupo);
    router.delete('/grupo/:url', AuthController.usuarioAutenticado, gruposController.eliminarGrupo);

    //letras.
    router.get('/letras', AuthController.usuarioAutenticado, letrasController.letrasPage);
    router.patch('/letras/:id', AuthController.usuarioAutenticado, letrasController.actualizarVisitas);
    router.post('/nuevaLetra', AuthController.usuarioAutenticado, [
        body('txtNombreCancion').not().isEmpty().trim().escape(),
        body('txtDescripcionCancion').not().isEmpty().trim().escape(),
    ], letrasController.nuevaCancion);
    router.get('/letra/:url', AuthController.usuarioAutenticado, letrasController.letraPorUrl);

    return router;

};