const { req, res } = require("express");
const Letras = require("../models/letras");
const Artistas = require("../models/artistas");
const Grupos = require("../models/grupos");

letrasPage = async(req, res) => {

    const usuarioId = res.locals.usuarios.id;

    const letras = await Letras.findAll({ where: { UsuarioId: usuarioId } });
    const artistas = await Artistas.findAll();
    const grupos = await Grupos.findAll();

    res.render('letras', {
        nombrePagina: 'Letras',
        artistas,
        grupos,
        letras
    });

};

nuevaCancion = async(req, res) => {

    let body = req.body;

    const artista = await Artistas.findOne({
        where: { idArtistas: body.txtIdArtista }
    });

    const grupo = await Grupos.findOne({
        where: { idGrupo: body.txtIdGrupo }
    });

    let errores = [];

    if (!body.txtNombreCancion) {
        errores.push({ 'texto': 'Digita el nombre de la cancion' });
    }

    if (!body.txtLetraCancion) {
        errores.push({ 'texto': 'Ingresa la fecha de nacimiento del Artista' });
    }

    if (errores.length > 0) {

        res.render('letras', {
            nombrePagina: 'Letras',
            errores
        });

    } else {

        const letras = await Letras.create({
            nombreCancion: body.txtNombreCancion,
            descripcionCancion: body.txtDescripcionCancion,
            letraCancion: body.txtLetraCancion,
            ArtistaIdArtistas: artista.idArtistas,
            GrupoIdGrupo: grupo.idGrupo,
            UsuarioId: res.locals.usuarios.id
        }).catch(err => console.log(err));
        res.redirect('/letras');

    }

};

letraPorUrl = async(req, res, next) => {

    const letrasPromise = Letras.findAll();

    const letraPromise = Letras.findOne({
        where: {
            url: req.params.url
        }
    });

    const [letras, letra] = await Promise.all([letrasPromise, letraPromise]);

    const grupo = await Grupos.findOne({
        where: {
            idGrupo: letra.GrupoIdGrupo
        }
    });

    const artista = await Artistas.findOne({
        where: {
            idArtistas: letra.ArtistaIdArtistas
        }
    });

    if (!letra) return next();

    res.render('resumenLetra', {
        nombrePagina: 'Letra de la cancion',
        letras,
        letra,
        grupo,
        artista
    });

};

actualizarVisitas = async(req, res) => {

    const letra = await Letras.findOne({
        where: {
            idLetra: req.params.id
        }
    });

    letra.numeroVisitas += 1;

    const resultado = await letra.save();

    if (!resultado) return next();

};

module.exports = {
    letrasPage,
    nuevaCancion,
    letraPorUrl,
    actualizarVisitas
};