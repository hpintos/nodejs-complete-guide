const config = require('./config.json');
const Sequelize = require('sequelize');

const sequalize = new Sequelize('node-complete', 'root', config.dbpassword, {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequalize;