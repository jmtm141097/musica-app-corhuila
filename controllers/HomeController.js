const { req, res } = require("express");
const Artistas = require("../models/artistas");
const Letras = require("../models/letras");

homePage = async(req, res) => {

    const letras = await Letras.findAll();

    res.render('home', {
        nombrePagina: 'Inicio',
        letras
    });

};


topPage = async(req, res) => {

    const letras = await Letras.findAll();

    res.render('top', {
        nombrePagina: 'Top 10',
        letras
    });

};


module.exports = {
    homePage,
    topPage
};