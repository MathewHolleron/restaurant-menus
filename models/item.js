const {sequelize} = require('../db');
const { DataTypes } = require('sequelize');

// TODO - create a item model
const Item = sequelize.define('item', {
    name: DataTypes.STRING
    
});

module.exports = {Item};