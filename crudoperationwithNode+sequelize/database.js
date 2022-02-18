const Sequelize = require('sequelize');

const connection = new Sequelize('nodetraining','root','admin',{dialect: 'mysql',host:'localhost'});

module.exports = connection;