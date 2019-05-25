module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Candidates', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        confirm: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        partyId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Parties',
                key: 'id',
            }
        },
        officeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            // primaryKey: true,
            references: {
                model: 'Offices',
                key: 'id',
            }
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            // primaryKey: true,
            references: {
                model: 'Users',
                key: 'id'
            }
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
    down: queryInterface => queryInterface.dropTable('Candidates')
};
