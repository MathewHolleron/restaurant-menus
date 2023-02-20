const {sequelize} = require('../db');
const { DataTypes } = require('sequelize');

// TODO - create a Restaurant model
const Menu = sequelize.define('menu', {
    title: DataTypes.STRING,
    
});

module.exports = {Menu};