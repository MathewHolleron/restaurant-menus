const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {sequelize} = require("../db")
const {Item} = require('./item')
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
Item.belongsToMany(Menu, {through:'menuitems'});
Menu.belongsToMany(Item, {through:'menuitems'});
module.exports = { Restaurant, Menu, Item}
