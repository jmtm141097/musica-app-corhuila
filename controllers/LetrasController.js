const { req, res } = require("express");
const Artistas = require("../models/artistas");

letrasPage = (req, res) => {

    res.render('letras', {
        nombrePagina: 'Letras'
    });

};

module.exports = {
    letrasPage
};