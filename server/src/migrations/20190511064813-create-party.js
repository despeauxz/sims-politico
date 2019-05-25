module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Parties', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        hqAddress: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        logoUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }),
    down: queryInterface => queryInterface.dropTable('Parties')
};
