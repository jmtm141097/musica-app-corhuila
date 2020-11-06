const { req, res } = require("express");
const Grupos = require("../models/grupos");
const Letras = require("../models/letras");

gruposPage = async(req, res) => {

    const letras = await Letras.findAll();
    const grupos = await Grupos.findAll({
        offset: 1
    });

    res.render('grupos', {
        nombrePagina: 'Grupos',
        grupos,
        letras
    });

};

nuevoGrupo = async(req, res) => {

    let imagen;

    let body = req.body;

    let errores = [];

    if (!body.txtNombreGrupo) {
        errores.push({ 'texto': 'Digita el nombre del Grupo' });
    }

    if (!body.txtDescripcionGrupo) {
        errores.push({ 'texto': 'Ingresa una descripcion del Grupo' });
    }

    if (!req.files) {
        imagen = './img/no-image.png';
    } else {

        imagen = req.files.txtImagenGrupo;
        let nombreCortado = imagen.name.split('.');
        let extension = nombreCortado[nombreCortado.length - 1];

        let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

        if (extensionesValidas.indexOf(extension) < 0) {
            errores.push({ 'texto': 'Las extensiones permitidas son ' + extensionesValidas.join(', ') });
        }

        imagen.mv('./public/img/grupos/' + imagen.name, err => {

            if (err) errores.push({ 'texto': err });

        });
    }

    if (errores.length > 0) {

        res.render('grupos', {
            nombrePagina: 'Grupos',
            errores
        });

    } else {

        const grupo = await Grupos.create({
            nombreGrupo: body.txtNombreGrupo,
            descripcionGrupo: body.txtDescripcionGrupo,
            imagenGrupo: '/img/grupos/' + (!req.files ? 'no-image.png' : imagen.name),
        }).catch(err => console.log(err));
        res.redirect('/grupos');

    }

};

grupoPorUrl = async(req, res, next) => {

    const letras = await Letras.findAll();

    const grupoPromise = Grupos.findOne({
        where: {
            url: req.params.url
        }
    });

    if (!grupoPromise) return next();

    const [grupo] = await Promise.all([grupoPromise]);

    res.render('resumenGrupo', {
        nombrePagina: 'Resumen del Grupo',
        letras,
        grupo
    });

};

formularioEditarGrupo = async(req, res) => {

    const letras = await Letras.findAll();

    const grupoPromise = Grupos.findOne({
        where: {
            idGrupo: req.params.id
        }
    });

    const [grupo] = await Promise.all([grupoPromise]);

    res.render('modificarGrupo', {
        nombrePagina: 'Modificar grupo',
        grupo,
        letras
    });

};

editarGrupo = async(req, res) => {

    const grupoPromise = Grupos.findOne({
        where: {
            idGrupo: req.params.id
        }
    });

    if (!grupoPromise) return next();

    const [grupo] = await Promise.all([grupoPromise]);

    let imagen;

    let body = req.body;

    let errores = [];

    console.log(errores);

    if (!body.txtNombreGrupo) {
        errores.push({ 'texto': 'Digita el nombre del Grupo' });
    }

    if (!body.txtDescripcionGrupo) {
        errores.push({ 'texto': 'Ingresa una descripcion del Grupo' });
    }

    if (!/^[a-záéíóúA-ZÁÉÍÓÚñÑ ]+$/.test(body.txtNombreGrupo)) {
        errores.push({ 'texto': 'En el nombre del artista solo se aceptan Letras A-Z, no caracteres especiales' });
    }

    if (!req.files) {
        imagen = grupo.imagenGrupo;
    } else {

        imagen = req.files.txtImagenGrupo;
        let nombreCortado = imagen.name.split('.');
        let extension = nombreCortado[nombreCortado.length - 1];

        let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

        if (extensionesValidas.indexOf(extension) < 0) {
            errores.push({ 'texto': 'Las extensiones permitidas son ' + extensionesValidas.join(', ') });
        }

        imagen.mv('./public/img/grupos/' + imagen.name, err => {

            if (err) errores.push({ 'texto': err });

        });
    }

    if (errores.length > 0) {

        res.render('grupos', {
            nombrePagina: 'Grupos',
            errores
        });

    } else {

        await Grupos.update({
            nombreGrupo: body.txtNombreGrupo,
            descripcionGrupo: body.txtDescripcionGrupo,
            imagenGrupo: (!req.files ? grupo.imagenGrupo : '/img/grupos/' + imagen.name),
        }, {
            where: { idGrupo: req.params.id }
        }).catch(err => console.log(err));
        res.redirect('/grupo/' + grupo.url);

    }

};

eliminarGrupo = async(req, res, next) => {

    const { urlGrupo } = req.query;

    const resultado = await Grupos.destroy({ where: { url: urlGrupo } });

    res.status(200).send('Grupo Eliminado Correctamente');

};

module.exports = {
    gruposPage,
    nuevoGrupo,
    grupoPorUrl,
    formularioEditarGrupo,
    editarGrupo,
    eliminarGrupo
};