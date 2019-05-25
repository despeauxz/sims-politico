module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Offices', {
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
        type: {
            type: Sequelize.ENUM,
            values: ['federal', 'legislative', 'state', 'local'],
            allowNull: false,
            defaultValue: 'federal'
        },
        electionDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            defaultValue: null
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
    down: queryInterface => queryInterface.dropTable('Offices')
};
