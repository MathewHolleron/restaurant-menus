const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const sequelize = require("../db")

async function main() {
    await sequelize.sync () ;
    
    await Restaurant.create({
        name: 'AppleBees',
        location: 'Texas',
        cuisine: 'FastFood',
    });
}

main();

module.exports = { Restaurant, Menu }
