const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
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
        // Create a new Restaurant
        const expectedData = {
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'FastFood',
          };
          
          const restaurant1 = await Restaurant.create({expectedData});
        // Create a new Menu associated with the Restaurant
        
        const menu1 = await Menu.create({title:'menu1'});
      
        // Retrieve the Restaurant and its Menus from the database
        const foundRestaurant = await Restaurant.findByPk(1);
        console.log(foundRestaurant)
        await foundRestaurant.addMenus(menu1);
        const menu2 = await foundRestaurant.getMenus();
        
    // Verify that the Restaurant has the correct associated Menu
    
    expect(menu2.title).toBe('menu1');
    
    });
})