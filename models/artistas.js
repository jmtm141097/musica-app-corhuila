const sequelize = require('sequelize');
const slug = require('slug');
const shortId = require('shortid');
const db = require('../db/db');

const Artistas = db.define('Artistas', {

    idArtistas: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER
    },
    nombreCompleto: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    descripcionArtista: {
        type: sequelize.TEXT('long'),
        allowNull: false
    },
    imagenArtista: {
        type: sequelize.STRING(100),
        defaultValue: 'img/no-image.png'
    },
    fechaNacimiento: {
        type: sequelize.DATEONLY(),
        defaultValue: '1850-12-31'
    },
    url: sequelize.STRING

}, {

    hooks: {

        beforeCreate(artista) {

            const url = slug(artista.nombreCompleto).toLowerCase();
            artista.url = `${url}-${shortId.generate()}`;

        }

    }

});

module.exports = Artistas;