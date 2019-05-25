module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Petitions', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
            }
        },
        officeId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
                model: 'Offices',
                key: 'id',
            }
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        evidence: {
            type: Sequelize.STRING,
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
    down: queryInterface => queryInterface.dropTable('Petitions')
};
