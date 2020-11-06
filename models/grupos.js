const sequelize = require('sequelize');
const slug = require('slug');
const shortId = require('shortid');
const db = require('../db/db');

const Grupos = db.define('Grupos', {

    idGrupo: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER
    },
    nombreGrupo: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    descripcionGrupo: {
        type: sequelize.TEXT('long'),
        allowNull: false
    },
    numeroVisitas: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    imagenGrupo: {
        type: sequelize.STRING(100),
        defaultValue: 'img/no-image.png'
    },
    url: sequelize.STRING

}, {

    hooks: {

        beforeCreate(grupo) {

            const url = slug(grupo.nombreGrupo).toLowerCase();
            grupo.url = `${url}-${shortId.generate()}`;

        }

    }

});

module.exports = Grupos;