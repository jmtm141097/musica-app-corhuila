const sequelize = require('sequelize');
const slug = require('slug');
const shortId = require('shortid');

const Artistas = require('../models/artistas');
const Grupos = require('../models/grupos');
const db = require('../db/db');

const Letras = db.define('Letras', {

    idLetra: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER
    },
    nombreCancion: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    descripcionCancion: {
        type: sequelize.TEXT('long'),
        allowNull: true
    },
    letraCancion: {
        type: sequelize.TEXT('long'),
        allowNull: false
    },
    url: sequelize.STRING

}, {

    hooks: {

        beforeCreate(letra) {

            const url = slug(letra.nombreCancion).toLowerCase();
            letra.url = `${url}-${shortId.generate()}`;

        }

    }

});

Letras.belongsTo(Artistas);
Letras.belongsTo(Grupos);

module.exports = Letras;