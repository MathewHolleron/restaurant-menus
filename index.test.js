const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
        
    });

    test('can create a Restaurant', async () => {
        const expectedData = {
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood',
          };
          await Restaurant.create(expectedData);
          const restaurant1 = await Restaurant.findByPk(1);
        expect(restaurant1.name).toBe('AppleBees');
        expect(restaurant1.location).toBe('Texas');
        expect(restaurant1.cuisine).toBe('FastFood');
    });

    test('can create a Menu', async () => {
        const expectedData = {
            title: 'menu1',
        };
        const menu1 = new Menu(expectedData);
        expect(menu1.title).toBe('menu1')
    });

    test('can find Restaurants', async () => {
        const expectedData = {
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood',
          };
          
          await Restaurant.create(expectedData);
          await Restaurant.findByPk(1)
          const foundRestaurant = await Restaurant.findByPk(1);
          expect(foundRestaurant.name).toBe(expectedData.name);
          expect(foundRestaurant.location).toBe(expectedData.location);
          expect(foundRestaurant.cuisine).toBe(expectedData.cuisine);
    });

    test('can find Menus', async () => {
        const expectedData = {
            title: 'menu1',
        };
        await Menu.create(expectedData);
        await Menu.findByPk(1);
        const foundMenu = await Menu.findByPk(1);
        expect(foundMenu.title).toBe(expectedData.title);
        
    });

    test('can delete Restaurants', async () => {
        const expectedData = {
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood',
          };
          await Restaurant.create(expectedData);
          const restaurant1 = await Restaurant.findByPk(1);
          await Restaurant.destroy({
            where: {
                name: 'AppleBees'
            }
          })

        expect(Restaurant.findByPk(1).name).toBe(undefined)
    });

    test('can create a Menu associated with a Restaurant', async () => {
        const expectedData = {
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood',
        };
          
        await Restaurant.create(expectedData);
        
        const menu1 = await Menu.create({title:'test'});
      
        const foundRestaurant = await Restaurant.findByPk(1);
        await foundRestaurant.addMenus(menu1);
        const foundMenu = await foundRestaurant.getMenus();
        
        expect(foundMenu[0].title).toBe('test');
    });

    test('can create a item', async () => {
        
        
        const item1 = await Item.create({name:'item'});
        expect(item1.name).toBe('item')
    });

    test('can create a Menu associated with a Restaurant', async () => {
        
          
        await Menu.create({title:'title'});
        
        const item1 = await Item.create({name:'test'});
      
        const foundmenu = await Menu.findByPk(1);
        await foundmenu.addItem(item1);
        const founditem = await foundmenu.getItems();
        
        expect(founditem[0].name).toBe('test');
    });

    test('can eager load menus', async () => {
        // Create some test data
        const menu = await Menu.create({title:'Test Menu'});
        const item = await Item.create({name:'Test Item'});
        await menu.addItems(item);
    
        // Query the database and eager load menus
        const items = await Item.findAll({
          include: Menu
        });
    
        // Expect the query to return the correct data
        expect(items.length).toBe(1);
        expect(items[0].name).toBe('Test Item');
        expect(items[0].menus.length).toBe(1);
        expect(items[0].menus[0].title).toBe('Test Menu');
      });
});
