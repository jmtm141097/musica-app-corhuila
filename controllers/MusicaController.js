const { req, res } = require("express");
const Artistas = require("../models/artistas");

homePage = async(req, res) => {

    const artistas = await Artistas.findAll();

    res.render('home', {
        nombrePagina: 'Inicio',
        artistas
    });

};

artistasPage = async(req, res) => {

    const artistas = await Artistas.findAll();

    res.render('artistas', {
        nombrePagina: 'Artistas',
        artistas
    });

};

nuevoArtista = async(req, res) => {

    let body = req.body;

    let errores = [];

    let registro = false;

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

    if (!body.txtImagenArtista) {
        var imagen = 'assets/img/no-image.png';
    } else {
        var imagen = body.txtImagenArtista;
    }

    if (errores.length > 0) {
        res.render('artistas', {
            nombrePagina: 'artistas',
            errores
        });
    } else {

        console.log(body.txtFechaNacimiento);

        const artistas = await Artistas.create({
            nombreCompleto: body.txtNombreArtista,
            descripcionArtista: body.txtDescripcionArtista,
            imagenArtista: imagen,
            fechaNacimiento: body.txtFechaNacimiento
        }).catch(err => console.log(err));
        registro = true;
        res.render('home', {
            registro,
            artistas
        });

    }

};

gruposPage = (req, res) => {

    res.render('grupos', {
        nombrePagina: 'Grupos'
    });

};

topPage = (req, res) => {

    res.render('top', {
        nombrePagina: 'Top 10'
    });

};

letrasPage = (req, res) => {

    res.render('letras', {
        nombrePagina: 'Letras'
    });

};

module.exports = {
    homePage,
    artistasPage,
    nuevoArtista,
    gruposPage,
    topPage,
    letrasPage
};