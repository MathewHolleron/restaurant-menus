const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {sequelize} = require("../db")

async function restaurant() {
    await sequelize.sync () ;
    
    await Restaurant.create({
        name: 'AppleBees',
        location: 'Texas',
        cuisine: 'FastFood',
    });
}

async function menu() {
    await sequelize.sync () ;
    
    await Menu.create({
        title: 'breakfast',
        
        
    });
}

Menu.belongsTo(Restaurant);
Restaurant.hasMany(Menu);

module.exports = { Restaurant, Menu}
