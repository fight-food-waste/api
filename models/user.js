// Apparently legacy way, working for now.

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
    }, {});
    User.associate = (models) => {
    // associations can be defined here
    };
    return User;
};

// Below is the new way.

// class Foo extends Model {
//     get fullName() {
//         return `${this.firstname  } ${  this.lastname}`;
//     }

//     set fullName(value) {
//         const names = value.split(' ');
//         this.setDataValue('firstname', names.slice(0, -1).join(' '));
//         this.setDataValue('lastname', names.slice(-1).join(' '));
//     }
// }
// Foo.init({
//     firstname: Sequelize.STRING,
//     lastname: Sequelize.STRING,
// }, {
//     sequelize,
// });
