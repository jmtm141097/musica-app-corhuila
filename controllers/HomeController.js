const { req, res } = require("express");
const Artistas = require("../models/artistas");
const Grupos = require('../models/grupos');
const Letras = require("../models/letras");

homePage = async(req, res) => {

    const letras = await Letras.findAll({
        limit: 10,
        include: {
            all: true
        }
    });

    const artistas = await Artistas.findAll({
        offset: 1,
        limit: 5
    });

    const grupos = await Grupos.findAll({
        offset: 1,
        limit: 5
    })

    res.render('home', {
        nombrePagina: 'Inicio',
        letras,
        artistas,
        grupos
    });

};


topPage = async(req, res) => {

    const letras = await Letras.findAll({
        order: [
            ['numeroVisitas', 'DESC']
        ],
        limit: 10,
        include: { all: true }
    });

    console.log(letras);

    res.render('top', {
        nombrePagina: 'Top 10',
        letras
    });

};


module.exports = {
    homePage,
    topPage
};