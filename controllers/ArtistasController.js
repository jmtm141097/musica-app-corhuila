const { req, res } = require("express");
const Artistas = require("../models/artistas");

artistasPage = async(req, res) => {

    const artistas = await Artistas.findAll();

    res.render('artistas', {
        nombrePagina: 'Artistas',
        artistas
    });

};

nuevoArtista = async(req, res) => {

    let imagen;

    let body = req.body;

    let errores = [];

    console.log(errores);

    if (!body.txtNombreArtista) {
        errores.push({ 'texto': 'Digita el nombre del Artista' });
    }

    if (!body.txtDescripcionArtista) {
        errores.push({ 'texto': 'Ingresa una descripcion del Artista' });
    }

    if (!body.txtFechaNacimiento) {
        errores.push({ 'texto': 'Ingresa la fecha de nacimiento del Artista' });
    }

    if (!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(body.txtNombreArtista)) {
        errores.push({ 'texto': 'En el nombre del artista solo se aceptan Letras A-Z, no caracteres especiales' });
    }

    if (!req.files) {
        imagen = './img/no-image.png';
    } else {

        imagen = req.files.txtImagenArtista;
        let nombreCortado = imagen.name.split('.');
        let extension = nombreCortado[nombreCortado.length - 1];

        let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

        if (extensionesValidas.indexOf(extension) < 0) {
            errores.push({ 'texto': 'Las extensiones permitidas son ' + extensionesValidas.join(', ') });
        }

        imagen.mv('./public/img/artistas/' + imagen.name, err => {

            if (err) errores.push({ 'texto': err });

        });
    }

    if (errores.length > 0) {

        res.render('artistas', {
            nombrePagina: 'artistas',
            errores
        });

    } else {

        const artistas = await Artistas.create({
            nombreCompleto: body.txtNombreArtista,
            descripcionArtista: body.txtDescripcionArtista,
            imagenArtista: '/img/artistas/' + (!req.files ? 'no-image.png' : imagen.name),
            fechaNacimiento: body.txtFechaNacimiento
        }).catch(err => console.log(err));
        res.redirect('/artistas');

    }

};

artistaPorUrl = async(req, res, next) => {

    const artistaPromise = Artistas.findOne({
        where: {
            url: req.params.url
        }
    });

    if (!artistaPromise) return next();

    const [artista] = await Promise.all([artistaPromise]);

    res.render('resumenArtista', {
        nombrePagina: 'Resumen del Artista',
        artista
    });

};

formularioEditarArtista = async(req, res) => {

    const artistaPromise = Artistas.findOne({
        where: {
            idArtistas: req.params.id
        }
    });

    const [artista] = await Promise.all([artistaPromise]);

    res.render('modificarArtista', {
        nombrePagina: 'Modificar artista',
        artista
    });

};

editarArtista = async(req, res) => {

    const artistaPromise = Artistas.findOne({
        where: {
            idArtistas: req.params.id
        }
    });

    if (!artistaPromise) return next();

    const [artista] = await Promise.all([artistaPromise]);

    let imagen;

    let body = req.body;

    let errores = [];

    console.log(errores);

    if (!body.txtNombreArtista) {
        errores.push({ 'texto': 'Digita el nombre del Artista' });
    }

    if (!body.txtDescripcionArtista) {
        errores.push({ 'texto': 'Ingresa una descripcion del Artista' });
    }

    if (!body.txtFechaNacimiento) {
        errores.push({ 'texto': 'Ingresa la fecha de nacimiento del Artista' });
    }

    if (!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(body.txtNombreArtista)) {
        errores.push({ 'texto': 'En el nombre del artista solo se aceptan Letras A-Z, no caracteres especiales' });
    }

    if (!req.files) {
        imagen = artista.imagenArtista;
    } else {

        imagen = req.files.txtImagenArtista;
        let nombreCortado = imagen.name.split('.');
        let extension = nombreCortado[nombreCortado.length - 1];

        let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

        if (extensionesValidas.indexOf(extension) < 0) {
            errores.push({ 'texto': 'Las extensiones permitidas son ' + extensionesValidas.join(', ') });
        }

        imagen.mv('./public/img/artistas/' + imagen.name, err => {

            if (err) errores.push({ 'texto': err });

        });
    }

    if (errores.length > 0) {

        res.render('artistas', {
            nombrePagina: 'artistas',
            errores
        });

    } else {

        await Artistas.update({
            nombreCompleto: body.txtNombreArtista,
            descripcionArtista: body.txtDescripcionArtista,
            imagenArtista: (!req.files ? artista.imagenArtista : '/img/artistas/' + imagen.name),
            fechaNacimiento: body.txtFechaNacimiento
        }, {
            where: { idArtistas: req.params.id }
        }).catch(err => console.log(err));
        res.redirect('/artista/' + artista.url);

    }

};

eliminarArtista = async(req, res, next) => {

    const { urlArtista } = req.query;

    const resultado = await Artistas.destroy({ where: { url: urlArtista } });

    res.status(200).send('Artista Eliminado Correctamente');

};

module.exports = {
    artistasPage,
    nuevoArtista,
    artistaPorUrl,
    formularioEditarArtista,
    editarArtista,
    eliminarArtista
};