module.exports = {
    up: queryInterface => queryInterface.bulkInsert('Users', [{
        username: 'john',
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {}),

    down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
