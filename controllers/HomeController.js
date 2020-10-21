const { req, res } = require("express");
const Artistas = require("../models/artistas");

homePage = async(req, res) => {

    const artistas = await Artistas.findAll();

    res.render('home', {
        nombrePagina: 'Inicio',
        artistas
    });

};


topPage = (req, res) => {

    res.render('top', {
        nombrePagina: 'Top 10'
    });

};


module.exports = {
    homePage,
    topPage
};