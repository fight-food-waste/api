module.exports = {
    up: queryInterface => queryInterface.bulkInsert('Users', [{
        username: 'john',
    }], {}),

    down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
