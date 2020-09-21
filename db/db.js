const { Sequelize } = require('sequelize');

const db = new Sequelize('musica', 'root', '..isdahut//9714', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    define: {
        timestamps: false
    }
});

module.exports = db;