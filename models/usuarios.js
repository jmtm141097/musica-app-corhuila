const Sequelize = require('sequelize');
const db = require('../db/db');
const Letras = require('../models/letras');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('Usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Agrega un Email valido"
            },
            notEmpty: {
                msg: 'El email no puede ir vacio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado.'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacio'
            }
        }
    }
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
            //console.log(usuario);
        }
    }
});

Usuarios.prototype.verificarPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Letras);

module.exports = Usuarios;